import { appNavigate } from '../../app/actions.native';
import { IStore } from '../../app/types';

import { _connectInternal } from './actions.any';
import { screen } from '../../mobile/navigation/routes';
export * from './actions.any';
import { AppState } from 'react-native';
import { disconnect } from '../connection/actions.any';

/**
 * Opens new connection.
 *
 * @param {string} [id] - The XMPP user's ID (e.g. {@code user@server.com}).
 * @param {string} [password] - The XMPP user's password.
 * @returns {Function}
 */
export function connect(id?: string, password?: string) {
    return (dispatch: IStore['dispatch']) => dispatch(_connectInternal(id, password));
}

/**
 * Hangup.
 *
 * @param {boolean} [_requestFeedback] - Whether to attempt showing a
 * request for call feedback.
 * @returns {Function}
 */
export function hangup(_requestFeedback = false) {
    return (dispatch: IStore['dispatch']) => {
        if (navigator.product === 'ReactNative') {
            dispatch(appNavigate(undefined));
        } else {
            dispatch(disconnect(true));
        }

    };
}
