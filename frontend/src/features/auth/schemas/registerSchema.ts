import { z } from "zod";
import { UDG_EMAIL_REGEX } from "./constants";

export const loginSchema = z.object({
    email: z.email({
        pattern: UDG_EMAIL_REGEX,
        error: "El correo debe ser institucional (@alumnos.udg.mx)"
    }),

    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(64, "La contraseña no debe exceder de 64 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número"),
})

export type LoginRequest = z.infer<typeof loginSchema>