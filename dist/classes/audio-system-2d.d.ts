import { Vec2 } from "../functions/math";
import { AudioNode2DConstructor, AudioNode2DControllerNodes, AudioNode2DControllerNodeName, AudioNode2DEvents, AudioSystem2DConstructor, Vector2, AudioNode2DAnalyserFFTSize, CompressorPresetsMap } from "../typings";
import { RenderObject } from "./renderobject";
export declare const AudioNode2DCompressorPresets: CompressorPresetsMap;
export declare class AudioNode2D implements AudioNode2DConstructor {
    audioSystem: AudioSystem2D;
    audioSource: HTMLAudioElement;
    x: number;
    y: number;
    range: number;
    id: string;
    timestamp: number;
    attachedRenderObject: RenderObject | null;
    isAudible: boolean;
    playWhenAudible: boolean;
    convolver: ConvolverNode;
    gainNode: GainNode;
    stereoPanner: StereoPannerNode;
    lowPassFilter: BiquadFilterNode;
    analyser: AnalyserNode;
    analyserBufferLength: number;
    analyserDataArray: Uint8Array;
    ctx: AudioContext;
    track: MediaElementAudioSourceNode;
    events: {
        [event in AudioNode2DEvents]?: () => void;
    };
    enable2DFilterManpulation: boolean;
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
    /**
     * Plays the audio node with all effects set.
     *
     * Does not play when property 'playWhenAudible' is set to true,
     * because the AudioSystem2D connected to this node will automatically play
     * the node when the listener is within the audio range.
     **/
    Play(timestamp?: number): this | undefined;
    /** Resets all gain value to the original */
    ResetGain(): AudioNode2D;
    /**Sets the gain value to a specific number.*/
    SetGainValue(gainValue: number): AudioNode2D;
    /** Sets the pan value to a specific number. Note that the value can only be within -1 and 1. */
    SetPanValue(panValue: number): AudioNode2D;
    /**Sets a specific value on the low-pass filter which has to be between 0 and ?*/
    SetLowPassFilterValue(value: number): AudioNode2D;
    /** Changes the current play time. */
    SetCurrentTime(timeInMilliseconds: number): AudioNode2D;
    /** Resets all filter value to the original */
    ResetFilter(): AudioNode2D;
    /** Returns the current loop value, or sets the loop value. */
    Loop(canLoop?: boolean): boolean | AudioNode2D;
    /** Returns or sets the current playback rate. */
    PlaybackRate(playbackRate?: number): number | AudioNode2D;
    /**
     * Sets the amount of window size samples when performing a FFT (Fast Fourier Transform)
     * to get frequency domain data.
     *
     * This method also sets the analyser buffer length, and data array.
     *
     * Must be a power of 2 between 2^5 and 2^15, so one of:
     * 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768. Defaults to 2048.
     *
     * Thrown if the value set is not a power of 2, or is outside the allowed range.
     */
    SetAnalyserFFTSize(fftSize: AudioNode2DAnalyserFFTSize): AudioNode2D;
    /**
     * The 'GetAnalyserByteTimeDomainData' method copies the current waveform, or time-domain, data
     * and returns it as a Uint8Array.
     *
     * If the array has fewer elements than the AnalyserNode.fftSize, excess elements are dropped. If it has more
     * elements than needed, excess elements are ignored.
     */
    GetAnalyserByteTimeDomainData(): Uint8Array;
    /**
     * The 'GetAnalyserByteFrequencyData' method copies current frequency data and returns it as a Uint8Array.
     *
     * The frequency data is composed of integers on a scale from 0 to 255.
     * Each item in the array represents the decibel value for a specific frequency. The frequencies are spread linearly
     * from 0 to 1/2 of the sample rate. For example, for 48000 sample rate, the last item of the array will represent the decibel value for 24000 Hz.
     *
     * If the array has fewer elements than the AnalyserNode.frequencyBinCount, excess elements are dropped.
     * If it has more elements than needed, excess elements are ignored.
     */
    GetAnalyserByteFrequencyData(): Uint8Array;
    /**
     * The minDecibels property of the AnalyserNode interface is a double value representing the minimum
     * power value in the scaling range for the FFT analysis data, for conversion to unsigned byte
     * values � basically, this specifies the minimum value for the range of
     * results when using GetAnalyserByteFrequencyData().
     *
     * A double, representing the minimum decibel value for scaling the FFT analysis data,
     * where 0 dB is the loudest possible sound, -10 dB is a 10th of that, etc. The default value is -100 dB.
     *
     * When getting data from GetAnalyserByteFrequencyData(), any frequencies with an amplitude of minDecibels or
     * lower will be returned as 0.
     */
    SetAnalyserMinDecibels(decibels: number): number;
    /**
     * The maxDecibels property of the AnalyserNode interface is a double value representing the maximum power value
     * in the scaling range for the FFT analysis data, for conversion to unsigned byte values � basically, this specifies
     * the maximum value for the range of results when using GetAnalyserByteFrequencyData().
     *
     * A double, representing the maximum decibel value for scaling the FFT analysis data, where 0 dB is the loudest possible
     * sound, -10 dB is a 10th of that, etc. The default value is -30 dB.
     *
     * When getting data from GetAnalyserByteFrequencyData(), any frequencies with an amplitude of maxDecibels or higher will
     * be returned as 255.
     */
    SetAnalyserMaxDecibels(decibels: number): number;
    /**
     * The smoothingTimeConstant property of the AnalyserNode interface is a double value representing the averaging constant
     * with the last analysis frame. It's basically an average between the current buffer and the last buffer the AnalyserNode
     * processed, and results in a much smoother set of value changes over time.
     *
     * A double within the range 0 to 1 (0 meaning no time averaging). The default value is 0.8.
     *
     * If 0 is set, there is no averaging done, whereas a value of 1 means "overlap the previous and current buffer quite a lot
     * while computing the value", which essentially smooths the changes across GetAnalyserByteFrequencyData calls.
     *
     * In technical terms, we apply a Blackman window and smooth the values over time. The default value is good enough for most cases.
     */
    SetAnalyserSmoothingTimeConstant(value: number): number;
    /**
     * Tries to find a specific audio controller node which return either the node itself,
     * or null if the specified node cannot be found.
    */
    GetAudioControllerNode(controllerNode: AudioNode2DControllerNodeName): AudioNode2DControllerNodes | null;
    /** Returns an array with all conencted audio-context nodes, including a biquad-filter node, stereo-panner node, gain node and an analyser node. */
    GetAllAudioControllerNodes(): AudioNode2DControllerNodes[];
    /**
     *  Disconnects any node audio context controllers from this 2D audio node.
     *
     *  The connected audio source, which is an audio DOM element, will also be removed using the domElement.remove() method.
     *  This makes the program unable to re-use this audio node.
     */
    Disconnect(): boolean;
    /**
     * Reconnects any audio context controllers order in a specific given order represented in an array with strings.
     * The array with strings can only include one controller name.
     *
     * Audio context controllers will not get connected when they are not specified in the array with controllers.
     *
     * The default audio context controllers order is as follow:
     * BiquadFilter > StereoPanner > GainNode > AnalyserNode
     */
    Reconnect(order: AudioNode2DControllerNodeName[]): AudioNode2D;
    /** Stops the playing audio from where it was. */
    Pause(): this;
    /**
     * Sets an event listener on this audio node, which will call a function if any of the specified events gets fired.
     * Note that existing events will be replaced.
     */
    AddEventListener(event: AudioNode2DEvents, cb: () => void): this;
    /**
     * Removes existing event listeners.
     */
    RemoveEventListener(event: AudioNode2DEvents): false | undefined;
    AttachRenderObject(renderObject: RenderObject): void;
    DetachRenderObject(): void;
    Update(deltaTime: number): void;
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
    UseCompressorPreset<K extends keyof CompressorPresetsMap>(preset: K): null | undefined;
    Update(deltaTime: number): void;
    PauseAllNodes(): AudioSystem2D;
    AttachRenderObject(renderObject: RenderObject): AudioSystem2D;
}
