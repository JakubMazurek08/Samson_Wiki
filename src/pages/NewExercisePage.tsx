import {useForm} from "react-hook-form"
import {db} from "../lib/firebase.ts"
import {addDoc, collection} from "firebase/firestore"

export const NewExercisePage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()

    const submit = async (data) => {

        try {
            console.log("Submitting data: ", data);
            const exerciseDocRef = await addDoc(collection(db, "exercises"), data);
            console.log("Document successfully added: ", exerciseDocRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <main className="flex w-[calc(100vw-320px)] h-[calc(100vh-80px)]  flex-col items-center ">
            <form className={" m-16 w-[50vw]"} onSubmit={handleSubmit(submit)}>
                <h1 className={"text-primary-dark font-bold text-4xl"}>Add New Exercise:</h1>

                <div className={"flex flex-col flex-wrap h-1/2 items-center gap-8"}>
                    <TextInput name={"name"} label={"name"} register={register} errors={errors}/>

                    <MuscleInput name={"primary"} label={"primary muscles"} register={register} errors={errors}/>
                    <MuscleInput name={"secondary"} label={"secondary muscles"} register={register} errors={errors}/>
                    <MuscleInput name={"ternary"} label={"ternary muscles"} register={register} errors={errors}/>

                    <EquipmentInput name={"equipment"} label={"equipment"} register={register} errors={errors}/>

                    <TextInput name={"grip"} label={"grip type"} register={register} errors={errors}/>
                    <TextInput name={"force"} label={"force type"} register={register} errors={errors}/>
                    <TextInput name={"difficulty"} label={"difficulty"} register={register} errors={errors}/>

                    <TextInput name={"step1"} label={"step 1"} register={register} errors={errors}/>
                    <TextInput name={"step2"} label={"step 2"} register={register} errors={errors}/>
                    <TextInput name={"step3"} label={"step 3"} register={register} errors={errors}/>

                </div>
                <button
                    className="p-2 w-20 rounded-2xl bg-primary-medium text-white font-bold hover:scale-110 transition-all duration-300"
                    type={"submit"}>ADD
                </button>
            </form>
        </main>
    )
}

const TextInput = ({name, label, register, errors}) => {
    return (
        <div className={"flex flex-col"}>
            <label className={"text-primary-medium m-2 text-2xl"}>{label}</label>
            <input className={"p-2 w-80 text-primary-medium bg-white border border-primary-medium rounded-md text-2xl"}
                   type="text" {...register(name, {
                required: `${label} field is required`
            })}/>
            {errors[name] && errors[name].message && (
                <h1 className="text-xl font-bold text-red-transparent">
                    {errors[name].message}
                </h1>
            )}
        </div>
    )
}

const MuscleInput = ({name, label, register, errors}) => {
    return (
        <div className={"flex flex-col"}>
            <label className={"text-primary-medium m-2 text-2xl"}>{label}</label>
            <select
                className={"p-2 w-80 text-primary-medium bg-white border border-primary-medium rounded-md text-2xl"} {...register(name, {
                required: `${label} field is required`,
            })}>
                <option value="none"> None</option>
                <option value="chest">Chest</option>
                <option value="back">Back</option>
                <option value="shoulders">Shoulders</option>
                <option value="biceps">Biceps</option>
                <option value="triceps">Triceps</option>
                <option value="forearms">Forearms</option>
                <option value="quads">Quads</option>
                <option value="hamstrings">Hamstrings</option>
                <option value="calves">Calves</option>
                <option value="abs">Abs</option>
                <option value="obliques">Obliques</option>
                <option value="glutes">Glutes</option>
                <option value="upper-back">Upper back</option>
                <option value="lower-back">Lower back</option>
                <option value="traps">Traps</option>
                <option value="lats">Lats</option>
            </select>
            {errors[name] && errors[name].message && (
                <h1 className="text-xl font-bold text-red-transparent">
                    {errors[name].message}
                </h1>
            )}
        </div>
    )
}

const EquipmentInput = ({name, label, register, errors}) => {
    return (
        <div className={"flex flex-col"}>
            <label className={"text-primary-medium m-2 text-2xl"}>{label}</label>
            <select
                className={"p-2 w-80 text-primary-medium bg-white border border-primary-medium rounded-md text-2xl"} {...register(name, {
                required: `${label} field is required`,
            })}>
                <option value="bodyweight"> Bodyweight</option>
                <option value="barbell">Barbell</option>
                <option value="dumbbell">Dumbbell</option>
                <option value="machine">Machine</option>
                <option value="cables">Cables</option>
                <option value="smith machine">Smitch Machine</option>
            </select>
            {errors[name] && errors[name].message && (
                <h1 className="text-xl font-bold text-red-transparent">
                    {errors[name].message}
                </h1>
            )}
        </div>
    )
}