import { createServer } from '@graphql-yoga/node'

const usuarios = [
    {
    id: '1',
    nome: 'Jão',
    idade: 23
    },
{
    id: '2',
    nome: 'Pedro',
    idade: 24
    }
];

const posts = [
    {
        id: '100',
        texto: "Estou na praia",
        user: '1',
    },
{
        id: '101',
        texto: "Eu gosto de programação",
        user: '2',        
    },
];

const reacoes = [
    {
        id: '10000',
        tipo : 'Gostei',
        user: '1',
        post: '101'
    },
    {
        id: '10001',
        tipo : 'Gostei',
        user: '2',
        post: '100'
    }
]

const comentarios =[
    {
        id:'1000',
        texto: 'Aproveita o sol',
        post: '100',
        user:'2'
    },
    {
        id:'1001',
        texto: 'Qual a sua linguagem favorita',
        post: '101',
        user:'1'
    },
    {
        id:'1002',
        texto: 'Eu gosto bastante de python',
        post: '101',
        user:'2'
    },
]

const typeDefs = `
    type Usuario {
        id: ID!
        nome: String!
        idade: Int!
        posts: [Post!]!
        comentarios: [Comentario!]!
        reacoes: [Reacao!]!
    }
    type Post {
        id: ID!
        texto: String!
        user: Usuario!
        comentarios: [Comentario!]!
        reacoes: [Reacao!]!
    }
    type Comentario {
        id: ID!
        texto: String!
        post: Post!
        user: Usuario!
    }
    type Reacao{
        id: ID!
        tipo: String!
        post: Post!
        user: Usuario!
    }
    type Query{
        bemVindo (nome: String) : String!
        usuarios: [Usuario!]!
        posts: [Post!]!
        comentarios: [Comentario!]!
        reacoes: [Reacao!]!
    }
`;

const resolvers = {
 Query: {
    bemVindo(parent, args, ctx, info) {
        return `Bem vindo ${args.nome ? args.nome : 'visitante'}`;
     },
    usuarios(parent, args, ctx, info){
        return usuarios;
    },
    posts(parent, args, ctx, info){
        return posts;
    },
    comentarios() {
        return comentarios;
    },
    reacoes(){
        return reacoes;
    }
 },
 Post:{
    user(parent, args, ctx, info){
        return usuarios.find((usuario)=>{
            return usuario.id === parent.user
        }
    )
    },
    comentarios(parent, args, ctx, info){
        return comentarios.filter((comentario)=>{
            return comentario.post === parent.id
        }
    )
    },
    reacoes(parent, args, ctx, info){
        return reacoes.filter((reacao)=>{
            return reacao.post === parent.id
        }
    )
    }
 },
 Usuario:{
    posts(parent, args, ctx, info){
        return posts.filter((post)=>{
            return post.user === parent.id
        }
    )
    },
    comentarios(parent, args, ctx, info){
        return comentarios.filter((comentario)=>{
            return comentario.user === parent.id
        }
    )
    },
    reacoes(parent, args,ctx, info){
        return reacoes.filter((reacao) =>{
            return reacao.user === parent.id
        })
    }
 },
 Comentario:{
    post(parent,args, ctx, info){
        return posts.find((post)=>{
            return post.id === parent.post
        })
    },
    user(parent, args, ctx, info){
        return usuarios.find((usuario)=>{
            return usuario.id === parent.user
        }
    )
    }
 },
 Reacao:{
    user(parent, args, ctx, info){
        return usuarios.find((usuario)=>{
            return usuario.id === parent.user
        }
    )
    }
 }
};

const server = createServer ({
 schema: {
 typeDefs,
 resolvers,
 }
})

server.start(() => {
 'Servidor no ar...'
})
