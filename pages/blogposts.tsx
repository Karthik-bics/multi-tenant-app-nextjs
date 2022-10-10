import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage
} from "next"


const Home : NextPage = ({ blogs } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1>These are the blogposts</h1>
            {blogs.map((blogpost : any) => {
                {blogpost}
            })}
        </div>  
    )
}

export const getServerSideProps : GetServerSideProps = async (ctx) => {

    const selectedDomain = await prisma?.domain.findUnique({
        where : {
            domain : ctx.req.headers.host
        }
    });

    if(!selectedDomain) {
        return {
            props: {
                error: "The domain was not registered in the app"
            }
        }
    }

    const blogs = await prisma?.blogpost.findMany({
        where:{
            organization : {
                domain: {
                    some: {
                        isValid : true,
                        doamin : selectedDomain.domain
                    }
                }
            }
        }
    });

    return {
        props : {
            blogs
        }
    }

}

export default Home;