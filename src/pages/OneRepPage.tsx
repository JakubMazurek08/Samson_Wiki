import { useForm } from "react-hook-form";
import { useState } from "react"

type Set = {
  weight: number;
  reps: number;
};


const formula = (weight: number, reps: number) => {
    return weight*(1 + (reps/30))
}

export const OneRepPage = () => {

  const [max, setMax] = useState<number>(0)
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Set>();

  const onSubmit = (data: Set) => {
    setMax(formula(data.weight, data.reps))
  }

  return (
    <div className="flex flex-col items-center w-[calc(100vw-320px)] h-[calc(100vh-5rem)]">
      <div className="flex justify-center items-center w-[calc(100vw-320px)] h-[calc(100vh-5rem)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("weight", {
              required: "podaj jakis ciezar kolego",
            })}
            type="number" 
            placeholder="weight"
            id="weight"
            className="border-2 rounded-md border-primary-light m-2"
          />
          {errors.weight && <p>{errors.weight.message}</p>}
          <input
            {...register("reps", {
              required: "ile zrobisz powtorzen",
              validate: (reps) =>
                reps <= 15 || "wez sobie wiekszy ciezar a nie cardio nakurwiasz",
            })}
            type="number"
            placeholder="reps"
            id="reps"
            className="border-2 rounded-md border-primary-light m-2"
          />
          {errors.reps && <p>{errors.reps.message}</p>}
          <input type="submit" value="submit" className="border-2 rounded-md border-primary-light m-2 px-2" />
        </form>
      </div>

      <div><p>your one rep max is: {max}</p></div>
      
    </div>
  );
};
