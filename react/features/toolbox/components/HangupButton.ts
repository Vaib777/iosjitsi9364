import _ from 'lodash';
import { connect } from 'react-redux';

import { createToolbarEvent } from '../../analytics/AnalyticsEvents';
import { sendAnalytics } from '../../analytics/functions';
import { leaveConference } from '../../base/conference/actions';
import { translate } from '../../base/i18n/functions';
import { IProps as AbstractButtonProps } from '../../base/toolbox/components/AbstractButton';
import AbstractHangupButton from '../../base/toolbox/components/AbstractHangupButton';
import { getCurrentConference } from '../../base/conference/functions';
import ConnectionService from '../../../features/mobile/call-integration/CallKit';
import jwtDecode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import CallKit from '../../mobile/call-integration/CallKit';
import { appNavigate } from '../../app/actions.native';
import {  NativeModules} from 'react-native';
const { OpenMelpModule } = NativeModules;
/**
 * Component that renders a toolbar button for leaving the current conference.
 *
 * @augments AbstractHangupButton
 */
const CallIntegration = CallKit || ConnectionService;
class HangupButton extends AbstractHangupButton<AbstractButtonProps> {

    _hangup: Function;

    accessibilityLabel = 'toolbar.accessibilityLabel.hangup';
    label = 'toolbar.hangup';
    tooltip = 'toolbar.hangup';

    /**
     * Initializes a new HangupButton instance.
     *
     * @param {Props} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: AbstractButtonProps) {
        super(props);

        this._hangup = _.once(() => {
            this.props.dispatch(leaveConference());
          

        });
    }

    /**
     * Helper function to perform the actual hangup action.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _doHangup() {
        this._hangup();
        OpenMelpModule.hangup();
    }
    _getView(props) {
        if (props.children) {
            return props.children(this._onClick);
        } else {
            return super._getView(props);
        }
    }
}

export default translate(connect()(HangupButton));
