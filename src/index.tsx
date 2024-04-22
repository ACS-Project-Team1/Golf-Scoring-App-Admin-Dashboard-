import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import HelpFeedback from 'views/admin/rtl';
import SignUp from 'views/auth/signUp';
import SignIn from 'views/auth/signIn';
import Help from 'views/admin/rtl';
import EditProfile from 'components/navbar/EditProfile';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<HashRouter>
				<Switch>
					<Route path={`/auth`} component={AuthLayout} />
					<Route path={`/admin`} component={AdminLayout} />
					{/* <Route path={`/rtl/help`} component={Help} /> */}
					<Route path={`/auth/sign-in`} component={SignIn} />
					<Route path={`/admin/editProfile`} component={EditProfile} />
					<Route path={`/auth/sign-up`} component={SignUp} />
					<Redirect from='/' to='/auth/sign-in' />
				</Switch>
			</HashRouter>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
