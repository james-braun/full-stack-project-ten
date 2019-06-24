

const UserSignOut = () => {
    localStorage.clear();
    window.location.href = '/';
    return null;
}

export default UserSignOut;