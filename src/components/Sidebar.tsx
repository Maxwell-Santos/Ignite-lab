import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";


export function Sidebar(){
  //pegando as aulas
  const { data } = useGetLessonsQuery()

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      
      <span className="font-bold text-2xl border-b pb-6 mb-6 border-gray-500 block">
        Cronogramas de Aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map( lesson =>{
          return(
            <Lesson 
              key={lesson.id}
              title={lesson.title} 
              slug={lesson.slug} 
              availableAt={new Date(lesson.availableAt)} //vai pegar a data la que eu coloquei na api, e converter para um date em js
              type={lesson.lessonType} 
            />
          )
        }) }
      </div>

    </aside>
  )
}