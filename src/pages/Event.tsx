import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";


export function Event() {
  //Este useParams, é função do react-router-dom, que retorna um objeto, e o atributo desse objeto é slug do tipo string
  //o slug está armazenando a url do vídeo
  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="flex flex-col min-h-screen">

      <Header />
      <main className="flex flex-1">
        
        {slug ? <Video lessonSlug={slug} /> : <div className="flex-1">sem nada</div>}

        <Sidebar />
      </main>
    </div>
  )
}