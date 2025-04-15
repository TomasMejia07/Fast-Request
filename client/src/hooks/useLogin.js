import { useState } from "react"
import { validacionDeCampos } from "../helpers/validacionDeCampos"

export const useLogin = (initial) => {

    const [loginActions, setLoginActions] = useState(initial)
    const [errores, setErrores] = useState({
        usuario: '',
        password: ''
    })

    const OnChangeInput = ({ target }) => {
        const { name, value } = target

        setLoginActions({
            ...loginActions,
            [name]: value
        })

        setErrores({
            ...errores,
            [name]: validacionDeCampos(name, value)
        })
    }

    return {
        OnChangeInput,
        errores,
        ...loginActions,
        setErrores
    }


}


