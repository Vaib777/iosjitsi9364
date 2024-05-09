import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import AudioMuteButton from '../../../toolbox/components/native/AudioMuteButton';
import VideoMuteButton from '../../../toolbox/components/native/VideoMuteButton';
import HangupButton from '../../../toolbox/components/HangupButton';
import ChatButton from '../../../../features/chat/components/native/ChatButton';
import { IReduxState, IStore } from '../../../app/types';
import AudioDeviceToggleButton from '../../../mobile/audio-mode/components/AudioDeviceToggleButton';
import styles, { DESKTOP_ENABLED_ICON, DESKTOP_DISABLED_ICON, ADD_CALL_ICON, 
    VIDEO_CALL_DISABLED_ICON,
    AUDIO_MUTE_DISABLED_ICON,
    VIEW_ATTENDEES_ENABLED_ICON,
    VIDEO_CALL_ENABLED_ICON,
    SPEAKER_ENABLED_ICON,
    MESSAGE_ICON,
    HOLD_ENABLED_ICON,
    HOLD_DISABLED_ICON,
    SPEAKER_DISABLED_ICON,
    VIEW_ATTENDEES_DISABLED_ICON,
    END_CALL_ICON,
    AUDIO_MUTE_ENABLED_ICON,
    SPEAKER_TEAMS_INACTIVE_ICON,
    SPEAKER_ONE_TO_ONE_INACTIVE_ICON,
    AUDIO_MUTE_TEAMS_INACTIVE_ICON,
    AUDIO_MUTE_ONE_TO_ONE_INACTIVE_ICON,
    VIDEO_ONE_TO_ONE_INACTIVE_ICON,
    VIDEO_TEAMS_INACTIVE_ICON ,
    BLUETOOTH} from './styles';
import { ColorPalette } from '../../../base/styles/components/styles/ColorPalette';
import HoldButton from './HoldButton';
import {NativeModules} from 'react-native';
import AudioRoutePickerDialog from '../../../mobile/audio-mode/components/AudioRoutePickerDialog';
import { translate } from '../../../base/i18n/functions';
import { connect } from 'react-redux';
import { openSheet } from '../../../base/dialog/actions';


type Props = AbstractButtonProps & {

    /**
    * The Redux dispatch function.
    */
    dispatch: Dispatch<any>
};


const { OpenMelpModule } = NativeModules;



// import AudioMuteButton from '../../../toolbox/components/AudioMuteButton';

/**
 *  Function which says if platform is iOS or not.
 *
 */
function isPlatformiOS(): boolean {
    return Platform.OS === 'ios';
}
const { AudioMode, OpenMelpChat } = NativeModules;

class CustomisedToolBox extends Component<Props, *> {
    _showAttendess: () =>void;
    _handleSpeakerClick(){
console.log("this.props._devices>>",this.props._devices);
        if(this.props._devices.length>2){
            this.props.dispatch(openSheet(AudioRoutePickerDialog));
        }else{
        const { setSpeakerState, speakerOn } = this.props;
       
        if(setSpeakerState){
            
                this.props.setSpeakerState(!speakerOn);
                if(speakerOn){
                    AudioMode.setAudioDevice("SPEAKER");
                }else{
                    AudioMode.setAudioDevice("Built-In Microphone");

                }
          
        }
    }
    }

    _showAttendees() {
            this.props.showAttendees();
    }

    _desktopIconClicked() {

        OpenMelpModule.showDesktop();
      //  OpenMelpChat.showDesktop();
    }
    _addToCall() {

        OpenMelpModule.addToCall();
        //AudioMode.shareMeetingInfo(true);
    }
    _chatClicked(){

     //AudioMode.openMelpChat(true)


   }
    _hangupClicked(){

         //AudioMode.hangUpFromAudioCallScreen(true)
   }
   _onMuteClick() {



   }
    setHoldState(isHoldOn) {
        this.setState({isHoldOn});
      OpenMelpModule.holdclick(isHoldOn);
    }

    constructor(props){
        super(props);
        this._handleSpeakerClick = this._handleSpeakerClick.bind(this);
        this._showAttendees = this._showAttendees.bind(this);
        this.setHoldState = this.setHoldState.bind(this);
        this.state = {isHoldOn: false};
        this.props.setSpeakerState(false);

    }
     /**
     * Implements {@link Component#componentDidMount()}. Invoked immediately
     * after this component is mounted.
     *
     * @inheritdoc
     * @returns {void}
     */
      componentDidMount() {
            AudioMode.setAudioDevice("Built-In Microphone");
            
    }

    render() {
        const toolBoxFunctionTextStyle =   this.props.isTeamsCall?styles.toolBoxFunctionTextTeamStyle:styles.toolBoxFunctionTextOneToOneStyle;
        const { setSpeakerState, speakerOn, isShowingAttendees }= this.props;
        const { isHoldOn } = this.state;
        const { audioMuted } = this.props;
        const toolBoxInactiveStyle = isHoldOn ?
        this.props.isTeamsCall ?
        styles.toolBoxFunctionInactiveTeamStyle: styles.toolBoxFunctionInactiveOneToOneStyle: toolBoxFunctionTextStyle;

        const audioMuteInactiveIconSource =
        this.props.isTeamsCall ? AUDIO_MUTE_TEAMS_INACTIVE_ICON : AUDIO_MUTE_ONE_TO_ONE_INACTIVE_ICON;

        const speakerIconInactiveSource =
        this.props.isTeamsCall ? SPEAKER_TEAMS_INACTIVE_ICON : SPEAKER_ONE_TO_ONE_INACTIVE_ICON;

        const videoIconInactiveSource =
        this.props.isTeamsCall ? VIDEO_TEAMS_INACTIVE_ICON : VIDEO_ONE_TO_ONE_INACTIVE_ICON;

        const speakerOnOffMessage =
        this.props.speakerOn ? "SPEAKER ON" : "SPEAKER OFF";

    var text = 'SPEAKER OFF';
    var icon = SPEAKER_DISABLED_ICON ;
    
    const devices = this.props._devices;
    //console.log("devices",devices);

    for(let i = 0; i < devices.length; i++){
        let singleObject = devices[i];
        let selected = singleObject.selected;
        let type = singleObject.type;
        if(type === 'BLUETOOTH' && selected){
            text = 'BLUETOOTH';
            icon = BLUETOOTH;
            break;

    
        }else if(type === 'HEADPHONES' && selected){
            text = 'HEADPHONES';
            icon = BLUETOOTH;
            break;

    
        }else if(type === 'SPEAKER' && selected){
            text = 'SPEAKER ON';
            icon = SPEAKER_ENABLED_ICON;
            break;

    
        }else if(type === 'EARPIECE' && selected){
            text = 'SPEAKER OFF';
            icon = SPEAKER_DISABLED_ICON;
            break;
        }
    }

        return (
            <View style = { styles.toolBoxContainerStyle }>
                <View style = { styles.toolBoxSectionContainerStyle} >
                <TouchableHighlight onPress={this._desktopIconClicked} underlayColor={ColorPalette.transparent}>
                    <View style = { styles.toolBoxFunctionContainerStyle }>
                        <Image style = { styles.desktopIconStyle } source = { DESKTOP_DISABLED_ICON }/>
                        <Text style = { toolBoxFunctionTextStyle }>DIALPAD</Text>
                    </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._showAttendees} underlayColor={ColorPalette.transparent}>
                        <View style = { styles.toolBoxFunctionContainerStyle }>
                            <Image style = { styles.attendeesIconStyle } source = { isShowingAttendees ? VIEW_ATTENDEES_ENABLED_ICON: VIEW_ATTENDEES_ENABLED_ICON }/>
                            <Text style = { toolBoxFunctionTextStyle }>ATTENDEES</Text>
                        </View>
                    </TouchableHighlight>
                   <TouchableHighlight onPress={this._addToCall} underlayColor={ColorPalette.transparent}>
                        <View style = { styles.toolBoxFunctionContainerStyle }>
                            <Image style = { styles.addCallIconStyle } source = { ADD_CALL_ICON }/>
                            <Text style = { toolBoxFunctionTextStyle }>ADD CALL</Text>
                        </View>
                    </TouchableHighlight>



                </View>
                <View style = { styles.toolBoxSectionContainerStyle} >

                        <AudioMuteButton>

                            {(isMuted, onClick) => (<TouchableHighlight disabled = {isHoldOn} onPress={onClick} underlayColor={ColorPalette.transparent}>
                                <View style = { styles.toolBoxFunctionContainerStyle }>
                                <Image source={isHoldOn ? AUDIO_MUTE_DISABLED_ICON : isMuted ? AUDIO_MUTE_ENABLED_ICON : AUDIO_MUTE_DISABLED_ICON} style={styles.muteIconStyle} />
                                <Text style={toolBoxInactiveStyle}>MUTE</Text>
                                </View>
                            </TouchableHighlight>)
                            }
                        </AudioMuteButton>


                         <VideoMuteButton >
                            {(_isVideoMuted, _onClick ) =>(
                            <TouchableHighlight  disabled = {isHoldOn} onPress={_onClick} underlayColor={ColorPalette.transparent}>
                                <View style={styles.toolBoxFunctionContainerStyle}>
                                <Image style={styles.videoIconStyle} source={isHoldOn ? VIDEO_CALL_DISABLED_ICON : !_isVideoMuted ? VIDEO_CALL_ENABLED_ICON :  VIDEO_CALL_DISABLED_ICON} />
                                    <Text style={toolBoxInactiveStyle}>VIDEO CALL</Text>
                                </View>
                            </TouchableHighlight>
                            )
                            }
                        </VideoMuteButton>
                        <AudioDeviceToggleButton>
                             {(_onClick) =>
                            (<TouchableHighlight disabled = {isHoldOn} onPress={this._handleSpeakerClick} underlayColor={ColorPalette.transparent}>
                                <View style = { styles.toolBoxFunctionContainerStyle }>
                                <Image  source={icon} 
                                style={styles.speakerIconStyle}/>
                                <Text style={toolBoxInactiveStyle}>{text}</Text>
                                
                                </View>
                            </TouchableHighlight>)
                            }
                    </AudioDeviceToggleButton>
                </View>
                <View style = { styles.toolBoxSectionContainerStyle} >
                   <ChatButton>
                        {(_onClick) =>
                        (
                        <TouchableHighlight onPress={_onClick} underlayColor={ColorPalette.transparent}>
                            <View style = { styles.toolBoxFunctionContainerStyle }>
                                <Image style = { styles.messageIconStyle } source = { MESSAGE_ICON }/>
                                <Text style = { toolBoxFunctionTextStyle }>MESSAGE </Text>
                            </View>
                        </TouchableHighlight>)
                        }
                    </ChatButton>


                    <HangupButton>
                        {
                            (_onClick) =>
                            (
                                <TouchableHighlight onPress={_onClick} underlayColor={ColorPalette.transparent}>
                                <View style = {styles.endCallFunctionContainerStyle}>
                                        <Image style = { styles.endIconStyle } source = { END_CALL_ICON } resizeMode = 'cover'/>
                                </View>
                                </TouchableHighlight>
                            )
                        }
                    </HangupButton>

                    <HoldButton setSpeakerState = {setSpeakerState}  speakerOn={speakerOn} setHoldState = {this.setHoldState} isHoldOn= {isHoldOn}>
                        {
                            (_onClick, isHoldDisabled) =>
                        (
                        <TouchableHighlight onPress={_onClick} underlayColor={ColorPalette.transparent}>
                            <View style = { styles.toolBoxFunctionContainerStyle }>
                                <Image source = { isHoldOn ? HOLD_ENABLED_ICON : HOLD_DISABLED_ICON}
                                    style = { styles.holdIconStyle } />
                                <Text style = { toolBoxFunctionTextStyle }>HOLD</Text>
                            </View>
                        </TouchableHighlight>
                        )
                        }
                    </HoldButton>
                </View>
            </View>
        );
    }
}

function _mapStateToProps(state : IReduxState) {
    return {
        _devices: state['features/mobile/audio-mode'].devices
    };
}
export default translate(connect(_mapStateToProps)(CustomisedToolBox));