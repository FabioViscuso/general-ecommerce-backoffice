import create from 'zustand';

export interface LoginSlice {
    isLogged: boolean,
    currentUser: {
        username: string,
        email: string,
        accessToken: string,
    },
    loginUser: (loggedUser: string, userEmail: string, userToken: string) => void
    logoutUser: () => void
}

const useLoginStore = create<LoginSlice>(
    (set, get) =>
    (
        {
            /* USER */
            isLogged: false,
            currentUser: {
                username: '',
                email: '',
                accessToken: '',
            },
            loginUser: (loggedUser: string, userEmail: string, userToken: string) => set(() => {
                return {
                    isLogged: true,
                    currentUser: {
                        username: loggedUser,
                        email: userEmail,
                        accessToken: userToken
                    },
                }
            }),
            logoutUser: () => set(() => {
                localStorage.removeItem('currentUser');
                return {
                    isLogged: false,
                    currentUser: {
                        username: '',
                        email: '',
                        accessToken: ''
                    }
                }
            }),
        }
    )
)

export default useLoginStore;
