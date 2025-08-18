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

		const isProd = process.env.NODE_ENV === 'production'

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			expires: expiresIn,
			secure: isProd, // только https в проде
			sameSite: isProd ? 'none' : 'lax', // для кросс-доменной работы на проде
			domain: isProd ? undefined : undefined // убрали костыль с COOKIE_DOMAIN
		})
	}

	async removeRefreshTokenFromResponse(res: Response) {
		const isProd = process.env.NODE_ENV === 'production'

		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			expires: new Date(0),
			secure: isProd,
			sameSite: isProd ? 'none' : 'lax',
			domain: isProd ? undefined : undefined
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
