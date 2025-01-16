// import { useForm } from "react-hook-form";
// import { useState } from "react";

// type Set = {
//   weight: number;
//   reps: number;
// };

// const formula = (weight: number, reps: number) => {
//   return weight * (1 + reps / 30);
// };

// export const OneRepPage = () => {
//   const [max, setMax] = useState<number>(0);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Set>();

//   const onSubmit = (data: Set) => {
//     setMax(formula(data.weight, data.reps));
//   };

//   return (
//     <div className="flex flex-col items-center w-full h-full text-primary-dark font-sans">
//       <header className="w-full bg-primary-medium text-secondary-light py-4 text-center shadow-md">
//         <h1 className="text-2xl font-bold">One Rep Max Tool</h1>
//       </header>

//       <main className="flex flex-col items-center w-full max-w-3xl p-6 bg-secondary-transparent rounded-lg shadow-lg mt-8">

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col items-center w-full"
//         >
//           <div className="flex flex-col md:flex-row justify-between w-full gap-4 mb-6">
//             <div className="flex flex-col w-full">
//               <label htmlFor="weight" className="text-primary-dark mb-2">
//                 Weight (kg)
//               </label>
//               <input
//                 {...register("weight", {
//                   required: "Podaj ciężar",
//                 })}
//                 type="number"
//                 id="weight"
//                 className="border-2 border-primary-medium rounded-md p-2 text-primary-dark placeholder-primary-medium focus:ring-2 focus:ring-secondary-medium focus:outline-none"
//               />
//               {errors.weight && (
//                 <p className="text-secondary-medium text-sm mt-1">
//                   {errors.weight.message}
//                 </p>
//               )}
//             </div>

//             <div className="flex flex-col w-full">
//               <label htmlFor="reps" className="text-primary-dark mb-2">
//                 Reps
//               </label>
//               <input
//                 {...register("reps", {
//                   required: "Podaj liczbę powtórzeń",
//                   validate: (reps) =>
//                     reps <= 15 || "Więcej niż 15? Wybierz większy ciężar.",
//                 })}
//                 type="number"
//                 id="reps"
//                 className="border-2 border-primary-medium rounded-md p-2 text-primary-dark placeholder-primary-medium focus:ring-2 focus:ring-secondary-medium focus:outline-none"
//               />
//               {errors.reps && (
//                 <p className="text-secondary-medium text-sm mt-1">
//                   {errors.reps.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-secondary-medium text-primary-dark py-2 px-4 rounded-md hover:bg-secondary-light transition-all duration-200"
//           >
//             Calculate
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-primary-dark text-lg">
//             Your one rep max is: <span className="font-bold">{max} kg</span>
//           </p>
//         </div>
//       </main>

//     </div>
//   );
// };


import { useForm } from "react-hook-form";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Rejestracja komponentów Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Set = {
  weight: number;
  reps: number;
};

const formula = (weight: number, reps: number) => {
  return Math.floor(weight * (1 + reps / 30));
};

export const OneRepPage = () => {
  const [max, setMax] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Set>();

  const onSubmit = (data: Set) => {
    setMax(formula(data.weight, data.reps));
  };

  // Dane do wykresu procentowego
  const data = {
    labels: ["50%", "60%", "70%", "80%", "90%", "100%"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [max * 0.5, max * 0.6, max * 0.7, max * 0.8, max * 0.9, max],
        backgroundColor: [
          "rgb(0 53 102)",
          "rgb(0 53 102)",
          "rgb(0 53 102)",
          "rgb(0 53 102)",
          "rgb(0 53 102)",
          "rgb(0 53 102)",
        ],
        borderColor: [
          "rgb(0 53 102)",
          "rgb(0 53 102)",
          "rgb(0 53 102)",
          "rgb(0 53 102)",
          "rgb(0 53 102)",
          "rgb(0 53 102)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Percentage of One Rep Max",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full h-full text-primary-dark font-sans">
      <header className="w-full bg-primary-medium text-secondary-light py-4 text-center shadow-md">
        <h1 className="text-2xl font-bold">One Rep Max Tool</h1>
      </header>

      <main className="flex flex-col items-center w-full max-w-3xl p-6 bg-secondary-transparent rounded-lg shadow-lg mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col md:flex-row justify-between w-full gap-4 mb-6">
            <div className="flex flex-col w-full">
              <label htmlFor="weight" className="text-primary-dark mb-2">
                Weight (kg)
              </label>
              <input
                {...register("weight", {
                  required: "Podaj ciężar",
                })}
                type="number"
                id="weight"
                className="border-2 border-primary-medium rounded-md p-2 text-primary-dark placeholder-primary-medium focus:ring-2 focus:ring-secondary-medium focus:outline-none"
              />
              {errors.weight && (
                <p className="text-primary-dark text-sm mt-1">
                  {errors.weight.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="reps" className="text-primary-dark mb-2">
                Reps
              </label>
              <input
                {...register("reps", {
                  required: "Podaj liczbę powtórzeń",
                  validate: (reps) =>
                    reps <= 10 || "Weź większy ciężar a nie cardio nakurwiasz",
                })}
                type="number"
                id="reps"
                className="border-2 border-primary-medium rounded-md p-2 text-primary-dark placeholder-primary-medium focus:ring-2 focus:ring-secondary-medium focus:outline-none"
              />
              {errors.reps && (
                <p className="text-primary-dark text-sm mt-1">
                  {errors.reps.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary-medium text-primary-dark py-2 px-4 rounded-md hover:bg-secondary-light transition-all duration-200"
          >
            Calculate
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-primary-dark text-lg">
            Your one rep max is: <span className="font-bold">{max} kg</span>
          </p>
        </div>

        <div className="w-full mt-8">
          <Bar data={data} options={options} />
        </div>
      </main>
    </div>
  );
};
