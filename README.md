# Sumário

-[IGNITE LAB by Maxwell](#ignite-lab-by-maxwell)
-[CMS - Content Management System (headless)](#cms---content-management-system-headless))
  -[E como funciona ?](#e-como-funciona)
-[CMS](#cms)
-[GraphQL](#graphql)
  -[Conexão da API com a aplicação](#conexão-da-api-com-a-aplicação)
  -[Chamadas do React com Apollo](#chamadas-do-react-com-apollo)
-[Erro comum de key ao usar map no React](#erro-comum-de-key-ao-usar-map-no-react)
-[Date-fns](#date-fns)
-[Vimejs](#vimejs)
-[Aprendendo cadastrar dados no GraphCMS](#aprendendo-cadastrar-dados-no-graphcms)
-[Definindo token e permissões](#definindo-token-e-permissões)
-[Adicionando na Aplicação](#adicionando-codegen-na-aplicação)
-[Condicionais dentro do Tailwind](#condicionais-dentro-do-tailwind)
-[GraphQL Code Generator](#graphql-code-generator)
-[Adicionando codegen na aplicação](#adicionando-codegen-na-aplicação)


# IGNITE LAB by Maxwell 

- Tecnologias
  - React
  - Typescript

  - Tailwind

  - GraphQL
  - Apollo
  - GraphCMS

## CMS - Content Management System (headless)

- A tecnologia vai ser o GraphCMS, ja que estou utilizando o GraphQL

- O painel de adm é o headless cms

- Os dados de estilização são fornecidos através de uma API REST OU GraphQL

- O frontend é desconectado com o CMS, dando assim muito mais flexibilidade de fazer o que quiser na interface

- (Gerir tudo que o ativo principal é gerido pelo autor)

### E como funciona ? 
O React vai fazer chamadas API para esse CMS, para poder mostrar em tela as informações.


## CMS 

- Dentro do cms tem os content types, que seria tipo os models, as entidades da aplicação.

- E dentro desses models tem que falar quais são os seus campos, são quais informações vou armazenar.
- Dentro do GraphCMS também é possível fazer relacionamentos (1 pra 1, 1 pra n, n pra n).

- Toda informação dentro do GraphCMS tem um estado, você pode salvar como rascunho  (quando salvo como rascunho, não vai ser possível acessar aquele item pela API)


## GraphQL
- Só existe dois tipos de operações: 
  - Query == buscar dados
  - Mutation == criar/alterar/deletar (informações)

  exemplo de código

```js
  query MyQuery {
    lessons {
      id
      slug
      title
      teacher {
        name
        avatarURL
        bio
      }
    }
  }
```

- OverFetching: Quando o backend retorna muito mais informações do que você precisa. Ou seja, o backend manda todos os dados e o frontend se vira para usar só o que ele precisa.

- UnderFetching: Quando o frontend precisa de um dado específico e o backend não retorna esse dado da requisição. Ou seja, quando o backend não retorna todas as coisas que o front precisa.

- Com GraphQL: Isso ja não acontece, porque na estrutura da requisição ele ja fala o que vai precisar em qual lugar e qual requisição.


### Conexão da API com a aplicação

- Ir até Project Settings
- Copiar <code>content API</code>
- Mudar permissões: Create Permission serve para mostrar o que qualquer um com aquela URL possa acessar dentro do bd

### Chamadas do React com Apollo

- Baixar
  - <code>npm i @apollo/client graphql</code>

- criar pasta dentro de src chamada <code>lib</code> e dentro um arquivo chamado apollo.ts (esse é o arquivo de config do apollo)

- Conectando o banco:

```ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4opcgjw0rnw01z4606f4qlp/master',
  cache: new InMemoryCache() //isso aqui server exatamente para manter o cache dos dados caso faça a mesma req (existem também a alternativa de LocalStorage etc)
})
```

- Exemplo de req no App

```tsx
import { gql, useQuery } from "@apollo/client";


const GET_LESSONS_QUERY = gql`
 query{
    lessons{
      id
      title
    }
  }
`

export function App(){

    useEffect(() =>{
    client.query({
      query: GET_LESSONS_QUERY,
      
    }).then(resp => {
      console.log(resp.data);
    })

  },[])
}

// usando um hook do React da integração com o Apollo

interface Lesson{
  id: string;
  title: string;
}

export function App() {

  const { data } = useQuery(GET_LESSONS_QUERY);
  console.log(data);

    return (
    <ul>
      {data?.lessons.map((lesson:Lesson) => {
        return <li>{lesson.title}</li>
      })}
    </ul>
  )
}
```
*NÃO ESQUEÇA*
- Quando usa esse hook, tem que colocar ao redor do App la no main o <code>< ApolloProvider ></code>

```tsx

import { ApolloProvider } from '@apollo/client'
import { client } from './lib/apollo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
```
### Erro comum de key ao usar map no React
- o primeiro elemento que vai aparecer nessa lista, precisa ter uma propriedade chamada key={atributo_identificador}, que identifica aquele elemento dentro de uma lista

```tsx
  return (
  <ul>
    {data?.lessons.map((lesson:Lesson) => {
      return <li key={lesson.id}>{lesson.title}</li>
    })}
  </ul>
  )

```

- Para fazer essas queries, uso a ferramenta Apollo (poderia ser usado o próprio fetch do js, axios), porém essas ferramentas são feitas para API GraphQL

- O Apollo faz controle de chace, ou seja, caso faça duas req iguais, ele retorna os mesmos dados
Exemplo de código: 

## Date-fns
- date-fns é uma lib para formatar datas de uma forma muito simples

## Vimejs
- é uma player de vídeo <a href="https://vimejs.com/getting-started/installation#react">Vimejs no React</a>

## Aprendendo cadastrar dados no GraphCMS
- O que é mutation?
  - Qualquer manipulação do dado que não seja apenas leitura, (ex: add, deletar, alterar), isso tudo são mutations

- Ir ao playground do GraphCMS, e na lista da esquerda, escrolar até o final

- Na parte de <code>Add new</code> e selecionar mutation e clicar no <strong>+</strong>, ao lado

- Vai criar uma nova aba com um ícone de M branco e fundo vermelho
obs: O GraphCMS, cria automaticamente "rotas" para escrita, atualização, remoção de todos os models que você criar

-  Uma coisa legal do GraphCMS é: acabei de criar um novo Inscrito, beleza. Agora eu quero retornar algum dado daquela informação recém criada, ex o ID... da para fazer isso na mesma req

- Quando você quiser adicionar algum dado de alguma input do usuário, basta criar uma variável. As variáveis no GraphQL, são definidas assim: <code>$nomeDaVariavel</code>; Caso seja um dado <strong>obrigatório</strong>, basta colocar exclamação '!'

```ts
//Aqui estou criando uma nova mutation com o nome CreateSubscriber que recebe duas variáveis do tipo String e obrigatórias
mutation CreateSubscriber($name: String!, $email: String!) {
  createSubscriber(data: {name: $name, email: $email}) {
    id
  }
}
```
- Para testar se essa Query funciona, nessa mesma aba 'Playground', você vai ver um <strong>QUERY VARIABLES</strong>, daí fazer a requisição em JSON. Obs: <strong>sempre use aspas dupla</strong>

```json
{
  "name": "Maxwell",
  "email": "maxwellalves@gmail.com"
}
```
- Clicar no símbolo de Play la em cima 
- Se deu tudo certo, vai retornar ao lado
- Vai na aba <strong>Content</strong> e no model que você escolheu, nesse caso salvei no <strong>Subscriber</strong> salvar como "Draft", que seria um "Rascunho" 

### Definindo token e permissões
- Quando você não quer só ler os dados do GraphCMS:
  - Ir até as configurações e em <strong>API acesses</strong>
  - Criar um <strong>Permanent Auth Tokens</strong>
  - Dar o nome para esse Token
  - Se quiser uma descrição também
  - E selecionar a opção de Published
  - Por fim, criar

- Agora na tela que você foi direcionado ir até <strong>Management API</strong> e clicar no botão de <strong>No, I'll configure custom permissions</strong> - <i>Isso é para que quem tiver esse acesso, apenas não vai poder criar  novos models e fazer várias outras coisas, no meu caso, só estou querendo criar um novo Subscriber</i>.

- Daí, agora em <strong>Content API</strong>, clicar em <strong>Yes, initialize defaults</strong> - <i>Isso faz com que possa ter a leitura de qualquer model publicado</i>

- Agora, para adicionar uma nova permissão, é só clicar no botão <strong>create permission</strong> e selecionar qual model e o que quer permitir, no meu caso vai ser no model <strong>Subscriber</strong> e a opção <strong>Create</strong>, e criar. - <i>O que eu fiz aqui é que qualquer um que tiver esse token que eu criei, pode criar uma novo subscriber</i>

### Adicionando token na Aplicação
- Copiar o "value" do token

- No src do projeto, criar uma variável ambiente no Vite - <i>variáveis ambientes, são dados que a gente quer diferente para cada ambiente  da aplicação, (ex: para produção um valor, testes outro, desenvolvimento outro)</i>
  - criar arquivo chamado .env
  - e dentro desse arquivo criar as variáveis ambiente, sua estrutura é assim para o Vite <code>VITE_NOME_DA_VARIAVEL= seu token copiado la do GraphCMS</code> 
  - adicionar ao .gitignore - <i>porque esse é um arquivo pessoal, que eu não quero que fique exposto no github</i>
  - usando as variáveis ambiente ficou assim:

```ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  headers: {
    'Authorization' : `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`
  },
  cache: new InMemoryCache()
})

```
- La na pasta lib e no arquivo que criei chamado apollo.ts, é onde esta a conexão ao GraphCMS,

- Para colocar o token, basta adicionar um cabeçalho

- Agora no componente Subscribe, fica assim

```tsx

//nesse exemplo de código, não está mostrando todas as configurações, apenas o essencial e as funcionalidade
import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";

//requisição para o banco de dados
const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber ($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`

export function Subscribe() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  async function handleSubscribe(event: FormEvent){
    event.preventDefault(); //para quando for feito o submit do form, não recarregar a página

    await createSubscriber({
      variables: {
        name,
        email,
      }
    })

    navigate('/event') //redirecionando o usuário para a página de evento
  }

  return (
    <form onSubmit={handleSubscribe} >
      <input 
        type="text"
        className="bg-gray-900 rounded px-5 h-14"
        placeholder="Seu nome completo"
        onChange={event => setName(event.target.value)}
        />

      <input 
        type="email"
        className="bg-gray-900 rounded px-5 h-14"
        placeholder="Digite seu e-mail"
        onChange={event => setEmail(event.target.value)}
        />

      <button 
        type="submit"
        className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors"
      >
        Garantir minha vaga
      </button>
    </form>
  )
}
```

## Condicionais dentro do Tailwind
- Para fazer condicionais com base no valor de uma variável é só fazer assim 

```tsx
const color = 'red';
//adicionar a interpolação de js mesmo
<div className={`w-full ${color === 'red' ? 'bg-color-red' : 'bg-color-blue'}`}></div>
```
- Outra alternativa é usando a lib <a href="https://www.npmjs.com/package/classnames">classnames</a>
  - <code>npm i classnames</code>

```tsx
//como primeiro parâmetro são os estilos que nunca mudam e segundo parâmetro é um objeto 
<div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
        'bg-green-500': isActiveLesson //quando essa variável retornar true, esse estilo será aplicado
      })}>

```

## GraphQL Code Generator

<a href="https://www.graphql-code-generator.com/docs/guides/react#apollo-and-urql">GraphQL codegen para React e Apollo</a>

- Fazendo as requisições direto da aplicação, ela não tem a inteligência de mostrar quais são os campos que existem, ocasionando facilmente um bug na requisição, além de que, por usar typescript, tem sempre que definir quais os tipos dos campos, mas la no GraphCMS ja foi definido isso, mas na aplicação ainda não.

### Adicionando codegen na aplicação

- Instalar essas ferramentas
  - <code>npm i @graphql-codegen/typescript-operations @graphql-codegen/typescript @graphql-codegen/typescript-react-apollo -D</code>

- Na raiz do projeto, criar um arquivo <code>codegen.yaml</code>
- No schema, colocar a url do projeto no GraphQL
- No 'documents', procurar qualquer arquivo dentro de src, dentro da pasta graphql, qualquer pasta e por fim qualquer arquivo com a extensão <code>.graphql</code>
- No generates, é onde vai ficar os arquivos criados automaticamente

<strong>obs: Todas as queries tem que ter um nome, quando usa o graphql codegen</strong>

```yaml
schema: http://my-graphql-api.com/graphql

documents: './src/graphql/**/*.graphql'

generates:
  ./src/graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      reactApolloVersion: 3
      withHooks: true
      withHOC: false
      withComponent: false

```
- Usando o GraphQL codegen, todas as queries, ficarão num só arquivo
- Organizando
  - criar uma pasta no SRC, que se chama graphql
  - criar duas pastas, uma 'mutation's e outra 'queries' e dentro de cada respectiva pasta colocar um arquivo da chamada correspondente
  
- Criar um script no package.json <code>"codegen": "graphql-codegen"</code>
  - rodando esse script, ele faz todo o output configurado e cria um arquivo com toda a tipagem da API
  - após isso, o codegen pega o nome da query e transforma em um hook, dentro do arquivo generated

```tsx
 //como era
import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

const GET_LESSONS_QUERY = gql`
query GetLessons { 
  lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
    id
    lessonType
    availableAt
    title
    slug
  }
} 
`
interface GetLessonsQueryResponse{
  lessons: {
    id: string;
    lessonType: string;
    availableAt: string;
    title: string;
    slug: string;
  }
}[]
export function Sidebar(){
  //pegando as aulas
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)

  return()
}

```
- Agora todos tipos e a query, estão no arquivo generated
```tsx
//como ficou 
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";


export function Sidebar(){
  //pegando as aulas
  const { data } = useGetLessonsQuery()

  return ()
}
```

## Deploy

- Vou fazer o deploy desse projeto na Vercel, e assim configurar la está tudo certinho, ja conectado com meu github
- Só preciso selecionar qual o projeto que eu quero subir e além disso configurar as variáveis ambientes na sessão 