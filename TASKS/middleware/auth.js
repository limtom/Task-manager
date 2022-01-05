/**
 * Auth middleware
 */

export default function ({ store, redirect }) {
    //If user is not authentication
    if (!store.state.user.isLoggedIn) {
        return redirect('/')
    }
}