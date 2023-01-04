import { Vec2 } from "../functions/math";
import { AudioNode2DConstructor, AudioNode2DEvents, AudioSystem2DConstructor, Vector2 } from "../typings";
import { RenderObject } from "./renderobject";
export declare class AudioNode2D implements AudioNode2DConstructor {
    audioSystem: AudioSystem2D;
    audioSource: HTMLAudioElement;
    x: number;
    y: number;
    range: number;
    id: string;
    timestamp: number;
    convolver: ConvolverNode;
    gainNode: GainNode;
    stereoPanner: StereoPannerNode;
    lowPassFilter: BiquadFilterNode;
    ctx: AudioContext;
    track: MediaElementAudioSourceNode;
    events: {
        [event in AudioNode2DEvents]?: () => void;
    };
    /**
     * Creates an audio node in which to configure audio.
     * This audio node is played dynamically based on the settings and the associated audio system.
     *
     * An error might be thrown when the maximum number of audio nodes in the given audio system exceeds.
     *
     * @param audioSystem Audio system in which the audio node will be attached to.
     * @param audioSource A HTMLAudioElement that will be used.
     * @param x x-axis of the audio node.
     * @param y y-axis of the audio node.
     * @param range Audio range of the audio node.
     **/
    constructor(audioSystem: AudioSystem2D, audioSource: HTMLAudioElement, x: number, y: number, range: number);
    get mainVolume(): number;
    get currentTime(): number;
    get currentSource(): string;
    get duration(): number;
    get playbackRate(): number;
    get loop(): boolean;
    get autoplay(): boolean;
    get panValue(): number;
    get panAutomationRate(): AutomationRate;
    get panMinValue(): number;
    get panMaxValue(): number;
    get gainValue(): number;
    get gainAutomationRate(): AutomationRate;
    get gainMinValue(): number;
    get gainMaxValue(): number;
    get filterFrequencyValue(): number;
    get filterFrequencyAutomationRate(): AutomationRate;
    get filterFrequencyMinValue(): number;
    get filterFrequencyMaxValue(): number;
    get filterGainValue(): number;
    get filterGainAutomationRate(): AutomationRate;
    get filterGainMinValue(): number;
    get filterGainMaxValue(): number;
    set mainVolume(value: number);
    set currentTime(value: number);
    set currentSource(value: string);
    set playbackRate(value: number);
    set loop(value: boolean);
    set autoplay(value: boolean);
    set panValue(value: number);
    set panAutomationRate(value: AutomationRate);
    set gainValue(value: number);
    set gainAutomationRate(value: AutomationRate);
    set filterFrequencyValue(value: number);
    set filterFrequencyAutomationRate(value: AutomationRate);
    set filterGainValue(value: number);
    set filterGainAutomationRate(value: AutomationRate);
    private _SetEventListeners;
    /**
     * Sets the position of this audio node.
     *
     * The pan value and the filter value are adjusted according to the set position.
     *
     * @param x x-axis
     * @param y y-axis
     */
    SetPosition(x: number | null, y: number | null): AudioNode2D;
    /**
     * Sets the position of this audio node.
     *
     * The pan value and the filter value are adjusted according to the set position.
     *
     * @param pos Vector2 object
     */
    Position(pos?: Vec2 | Vector2): Vector2;
    /** Plays the audio node with all effects set. */
    Play(timestamp?: number): this | undefined;
    /** Resets all gain value to the original */
    ResetGain(): AudioNode2D;
    /** Resets all filter value to the original*/
    ResetFilter(): AudioNode2D;
    /** Disconnects any audio context related object from the associated audio system. */
    Disconnect(): void;
    /** Pauses the audio node. */
    Pause(): this;
    AddEventListener(event: AudioNode2DEvents, cb: () => void): this;
}
export declare class AudioSystem2D implements AudioSystem2DConstructor {
    /** Don't play with this plz. */
    id: string;
    /**
     * Maximum number of audio nodes. Default value is 50.
     * An error is returned when the maximum value is exceeded.
     *
     * Does NOT accept float values.
     **/
    maxAudioNodes: number;
    /** Entire audio context. */
    ctx: AudioContext;
    gain: GainNode;
    panner: StereoPannerNode;
    compressor: DynamicsCompressorNode;
    /** Array containing audio nodes. */
    nodes: AudioNode2D[];
    attachedRenderObject: RenderObject;
    /**
     * Creates an empty 2 dimensional audio system, allowing audio playback based on positioning and distance
     * You can use an 'AudioNode2D' class to play audio on this system.
     */
    constructor();
    /**
     * Sets the volume of the entire audio system.
     * Note that the audio can sound very distorted if the value is set above 2.
     *
     * Does accept float values.
     * */
    get masterVolume(): number;
    /**
     * Sets the volume of the entire audio system.
     * Note that the audio can sound very distorted if the value is set above 2.
     *
     * Does accept float values.
     * */
    set masterVolume(volume: number);
    /**
     * Sets the entire stereo panning value of this system. This affects all added audio nodes.
     * The value of the panning cannot be less than -1 and more than 1. The default value is 0.
     *
     * To reset the stereo panning value, use the 'ResetPanning' method.
     */
    get masterPanning(): number;
    /**
     * Sets the entire stereo panning value of this system. This affects all added audio nodes.
     * The value of the panning cannot be less than -1 and more than 1. The default value is 0.
     *
     * To reset the stereo panning value, use the 'ResetPanning' method.
     */
    set masterPanning(pan: number);
    /**
     * Sets the entire stereo panning value of this system. This affects all added audio nodes.
     * The value of the panning cannot be less than -1 and more than 1. The default value is 0.
     *
     * To reset the stereo panning value, use the 'ResetPanning' method.
     *
     * This method does accept float values.
     *
     * @param panValue Value that has to be within -1 and 1. Does accept float values.
     */
    SetPanValue(panValue: number): AudioSystem2D;
    /**
     * Sets the volume of the entire audio system.
     * Note that the audio can sound very distorted if the value is set above 2.
     *
     * Does accept float values.
     * */
    SetMasterVolume(value: number): AudioSystem2D;
    /**
     * Removes an added audio node.
     */
    DestroyAudioNode2D(audioNode: AudioNode2D): void;
    SetCompressorAttackValue(value: number): AudioSystem2D;
    SetCompressorKneeValue(value: number): AudioSystem2D;
    SetCompressorRatioValue(value: number): AudioSystem2D;
    SetCompressorReleaseValue(value: number): AudioSystem2D;
    SetCompressorThresholdValue(value: number): AudioSystem2D;
    Update(): void;
    PauseAllNodes(): AudioSystem2D;
    AttachRenderObject(renderObject: RenderObject): AudioSystem2D;
}
