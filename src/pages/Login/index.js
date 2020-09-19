import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import FormRow from '../../components/FormRow';

import { processLogin } from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      message: '',
    };
  }

  componentDidMount() {
    var firebaseConfig = {
      apiKey: 'AIzaSyBwHMcqGKcrqx_I3BFk_eWwUYBCmDl-3zw',
      authDomain: 'ec2-series.firebaseapp.com',
      databaseURL: 'https://ec2-series.firebaseio.com',
      projectId: 'ec2-series',
      storageBucket: 'ec2-series.appspot.com',
      messagingSenderId: '813395695217',
      appId: '1:813395695217:web:cf636f5c6ea3f484ff2dd0',
      measurementId: 'G-KSWS9ESCXD',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  onChangeHandler(field, valor) {
    this.setState({
      [field]: valor,
    });
  }

  processLogin() {
    this.setState({ isLoading: true });

    const { email, password } = this.state;

    this.props.processLogin({email, password})
    .then(user => {
      if (user) {
        this.props.navigation.replace('Main');
      } else {
        this.setState({
          isLoading: false,
          message: '',
        });
      }
    }).catch( error => {
      this.setState({
        isLoading: false,
        message: this.getMessageByError(error.code),
      });
    });
  }

  getMessageByError(code) {
    switch (code) {
      case 'auth/user-not-found':
        return 'E-mail inexistente';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      default:
        return 'Erro desconhecido';
    }
  }

  renderButton() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    }

    return (
      <Button
        title="Entrar"
        onPress={() => this.processLogin()}
      />
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message) {
      return null;
    }

    return (
      <View>
        <Text>{message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        <FormRow>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail: user@provider.com"
            value={this.state.email}
            onChangeText={ valor => {
              this.onChangeHandler('email', valor);
            }}
          />
        </FormRow>

        <FormRow>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password here"
            secureTextEntry
            value={this.state.password}
            onChangeText={ valor => {
              this.onChangeHandler('password', valor);
            }}
          />
        </FormRow>

        { this.renderButton() }

        { this.renderMessage() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default connect(null, { processLogin })(Login);
