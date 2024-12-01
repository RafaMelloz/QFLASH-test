import { User, Address } from "@/utils/types";
import { create } from "zustand"

interface StoreState {
    isLoggedIn: boolean; // indica se o usuário está logado
    loggedUser?: User; // guarda o usuario q logou
    users: User[]; // lista de usuários
    selectedUser?: User; // usuário selecionado
    searchValue?: string; // valor de busca

    login: (user: User) => void; // define o usuario como logado e guarda o usuario
    logout: () => void; // desloga o usuario e limpa o usuario logado/selecionado

    setSearchValue: (value: string) => void; // guarda o valor de busca

    setUsers: (users: User[]) => void; // guard todos os usuuarios
    selectUser: (user: User) => void;  // guarda o usuario selecionado

    updateAddress: (userId: string, address: Address | null) => void; // atualiza o endereço do usuario
}

const useStore = create<StoreState>((set) => ({
    isLoggedIn: false,
    loggedUser: undefined,
    users: [],
    selectedUser: undefined,
    searchValue: '',

    login: (user) => set({ isLoggedIn: true, loggedUser: user }), // 

    logout: () => set({ isLoggedIn: false, loggedUser: undefined, selectedUser: undefined }),

    setSearchValue: (value) => set({ searchValue: value }),

    setUsers: (users) => set({ users }),

    selectUser: (user) => set({ selectedUser: user }),

    updateAddress: (userId, address) =>
    set((state) => ({
        users: state.users.map((user) =>
            user.id === userId ? { ...user, address } : user
        ),
    })),
}));

export default useStore;