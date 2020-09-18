const USER_LOGIN_SUCCESS = 'USER_LOGIN';
const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  user,
});

const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
  type: USER_LOGOUT,
});

export const processLogin = ({email, password}) => {
  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(

    )
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        Alert.alert(
          'Usuário não encontrado',
          'Deseja criar um novo usuário?',
          [{
            text: 'Não',
            onPress: () => {
              console.log('Usuário não quis criar nova conta');
            },
          }, {
            text: 'Sim',
            onPress: () => {
              firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(loginUserSuccess)
                .catch(loginUserFail);
            },
          }],
          { cancelable: true }
        );
      }
      loginUserFail;
    }).then(() => {
      this.setState({ isLoading: false });
    });
}
