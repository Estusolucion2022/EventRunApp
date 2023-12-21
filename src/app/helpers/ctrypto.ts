import { mode, enc, AES } from "crypto-js"

export class Compress {

	private static angulark(type: number): any {
		let angular = null
		if (type === 1) {
			const a = "_0xDcZ6A_0xQxh2F7/"
			const b = "_0xLqqb0r_0xlwAh"
			const c = "_0xA2f_0xy57J"
			const d = "_0xuL_0xdy_0xRBq"
			const e = "_0x5s_0xpbJYE="
			angular = [a, b, c, d, e,]
		}
		else if (type === 2) {
			const a = "_0x5m_0xSnyT"
			const b = "_0xtU_0xook"
			const c = "_0xKd_0xc/d"
			const d = "_0xatO4_0xDg=="
			angular = [a, b, c, d,]
		}
		return angular?.join("")
	}

	public static _008(valor: string) {
		const key = enc.Base64.parse(this.angulark(1).replace(new RegExp("_0x", "g"), ""))
		const iv = enc.Base64.parse(this.angulark(2).replace(new RegExp("_0x", "g"), ""))
		const datos = AES.decrypt(valor, key, {
			iv: iv,
			mode: mode.CBC,
		})
		return datos.toString(enc.Utf8)
	}

	public static _007(valor: string) {
		const key = enc.Base64.parse(this.angulark(1).replace(new RegExp("_0x", "g"), ""))
		const iv = enc.Base64.parse(this.angulark(2).replace(new RegExp("_0x", "g"), ""))
		const datos = AES.encrypt(valor, key, {
			iv: iv,
			mode: mode.CBC,
		})
		return datos.toString()
	}
}