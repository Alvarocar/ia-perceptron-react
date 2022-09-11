import { useCallback } from "react"
import { useForm } from "react-hook-form"

const TrainForm = ({
  onSubmit
}) => {
  const { handleSubmit, register } = useForm()

  const sendData = useCallback((data) => {
    onSubmit(data)
  }, [onSubmit])

  return (
    <form className="perceptron__form-train" onSubmit={handleSubmit(sendData)}>
      <label>
        N&uacute;mero de Ciclos de aprendizaje
        <input className="input" type="number" max="100" min="1" required {...register("ephos")} />
      </label>
      <button type="submit">Comenzar aprendizaje</button>
    </form>
  )
}

export default TrainForm