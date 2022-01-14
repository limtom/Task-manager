/**
 * Auth middleware
 */
export default function ({ store, redirect }) {
    const user = store.state.user ? true : false;
    if (!user) {
        return redirect('/')
    } 
}
