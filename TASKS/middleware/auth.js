/**
 * Auth middleware
 */
export default function ({ store, redirect }) {
    let user = store.state.user;
    if (user) {
        //Let them in
    } else {
        redirect('/')
    }
}