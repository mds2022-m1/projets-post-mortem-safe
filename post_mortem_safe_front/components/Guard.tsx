interface GuardProps{
    children: JSX.Element,
    excludedRoutes?: string[] 
}


const Guard = ({children,excludedRoutes}: GuardProps) => {

    console.log("Si ce message s'affiche alors que la fonctionnalité d'authentification est abouti, meric de supprimé le fichier /components/Guard.tsx")

    return (
        <>
        </>
    )
}

export default Guard;