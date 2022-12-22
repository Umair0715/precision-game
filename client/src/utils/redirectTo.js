export const redirectTo = (navigate , user) => {
    navigate(user?.role === 1 ? '/buyer' : user?.role === 2 ? '/seller' : user?.role === 3 ? '/admin/dashboard' : '/?login=true')
}

export const checkAdmin = (navigate,user) => {
    if(!user){
        navigate('/?login=true')
    }else if(user?.role !== 3){
        navigate(user?.role === 2 ? '/buyer' : user?.role === 1 ? '/seller' : '/?login=true' )
    }
}