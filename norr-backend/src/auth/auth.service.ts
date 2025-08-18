import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

@Injectable()
export class AuthServise {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private userService: UserService,
		private jwt: JwtService
	) {}

	async login(dto: AuthDto) {
		const { password, role, ...user } = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id)

		return { user, ...tokens }
	}
	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByEmail(dto.email)
		if (oldUser) {
			throw new BadRequestException('User already exist!')
		}

		const { password, role, ...user } = await this.userService.create(dto)
		const tokens = this.issueTokens(user.id)

		return { user, ...tokens }
	}

	async getNewToken(refreshToken: string) {
		let payload: { id: string }
		try {
			payload = await this.jwt.verifyAsync(refreshToken)
		} catch (error) {
			throw new UnauthorizedException('Invalid refresh token')
		}

		const user = await this.userService.getById(payload.id)
		if (!user) {
			throw new NotFoundException('User not found!')
		}

		const { password, role, ...saveUser } = user

		const tokens = this.issueTokens(user.id)

		return { saveUser, ...tokens }
	}

	async addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN || undefined, // ⬅️ гибко
			expires: expiresIn,
			secure: process.env.NODE_ENV === 'production', // только https
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
		})
	}

	async removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN || undefined,
			expires: new Date(0),
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
		})
	}

	private issueTokens(userID: string) {
		const data = { id: userID }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)
		if (!user) {
			throw new NotFoundException('Email not found')
		}
		const isValidPassword = await verify(user.password, dto.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid password!')
		}

		return user
	}
}
