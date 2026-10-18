import type { Account, DriverDocument, Role, VehicleData } from "./types"

// Cuentas de acceso rápido. No se muestran en ninguna pantalla: solo sirven para iniciar sesión.
// Las contraseñas se guardan como hash PBKDF2, igual que las cuentas registradas.
type Preset = { account: Account }

const base = {
  contactName: "",
  contactPhone: "",
  relationship: "",
  needs: [] as string[],
  needsNote: "",
  preset: true,
}

export const PRESETS: Record<Role, Preset> = {
  passenger: {
    account: {
      ...base,
      name: "Laura Pasajera",
      phone: "3001112233",
      email: "pasajero@taxiya.app",
      password:
        "pbkdf2-sha256$310000$01abec5be7f21ff3b351c29b75805c0c$6b46fc183495c384b75cfe93eb569234eaf4602ff2b9349df370bc3215eb391a",
      contactName: "Marta Pasajera",
      contactPhone: "3004445566",
      relationship: "Familiar",
      preference: "Pasajera",
    },
  },
  driver: {
    account: {
      ...base,
      name: "Carlos Conductor",
      phone: "3002223344",
      email: "conductor@taxiya.app",
      password:
        "pbkdf2-sha256$310000$4750c950a5015b512a5832e28c1dcabd$696ee0c015b7243a44b977fd72dea2ad938356636f3bf2b75a5410903479b3f2",
      preference: "Pasajero",
    },
  },
  admin: {
    account: {
      ...base,
      name: "Administrador TaxiYa",
      phone: "3003334455",
      email: "admin@taxiya.app",
      password:
        "pbkdf2-sha256$310000$2c3d26f8060b773e459d8097b4347560$5ba3c13342b258960d3c177ccd1186cbab2bb6461d341828c4ac720afa90db49",
      preference: "Prefiero no decirlo",
    },
  },
}

export const presetVehicle: VehicleData = {
  make: "Chevrolet Spark",
  color: "Amarillo",
  plate: "OCA-123",
}

export const presetDocuments = (): DriverDocument[] =>
  ["Foto del conductor", "Licencia", "SOAT", "Tarjeta de propiedad", "Foto del vehículo"].map(
    (name) => ({ name, uploaded: true, fileName: `${name}.pdf` }),
  )

export const presetFor = (role: Role, email: string) => {
  const account = PRESETS[role].account
  return account.email === email.trim().toLowerCase() ? account : null
}

export const isPresetEmail = (email?: string | null) =>
  Boolean(email) &&
  Object.values(PRESETS).some(
    (preset) => preset.account.email === email!.trim().toLowerCase(),
  )
