import create from 'zustand';

export interface NotificationSlice {
    isNotificationVisible: boolean,
    isOkStatus: boolean,
    message: string,
    setNotificationContent: (isOk: boolean, message: string) => void,
    resetNotificationContent: () => void,
}

export interface UiSlice {
    isLoginModalOpen: boolean,
    isSignupModalOpen: boolean,
    isCartVisible: boolean,
    showLoginModal: () => void,
    hideLoginModal: () => void,
    showSignupModal: () => void,
    showCart: () => void,
    hideCart: () => void,
    hideSignupModal: () => void,
}

export type GeneralState = NotificationSlice & UiSlice

const useUIstore = create<GeneralState>(
    (set, get) =>
    (
        {
            /* NOTIFICATION */
            isNotificationVisible: false,
            isOkStatus: false,
            message: '',
            setNotificationContent: (isOk, message) => set((state) => ({
                isNotificationVisible: state.isNotificationVisible = true,
                isOkStatus: state.isOkStatus = isOk,
                message: state.message = message
            })),
            resetNotificationContent: () => set((state) => ({
                isNotificationVisible: state.isNotificationVisible = false,
                isOkStatus: state.isOkStatus = false,
                message: state.message = ''
            })),

            /* UI COMPONENTS */
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            isCartVisible: false,
            showLoginModal: () => set((state) => ({ isLoginModalOpen: state.isLoginModalOpen = true })),
            hideLoginModal: () => set((state) => ({ isLoginModalOpen: state.isLoginModalOpen = false })),
            showSignupModal: () => set((state) => ({ isSignupModalOpen: state.isSignupModalOpen = true })),
            hideSignupModal: () => set((state) => ({ isSignupModalOpen: state.isSignupModalOpen = false })),
            showCart: () => set((state) => ({ isCartVisible: state.isCartVisible = true })),
            hideCart: () => set((state) => ({ isCartVisible: state.isCartVisible = false })),
        }
    )
)

export default useUIstore;
