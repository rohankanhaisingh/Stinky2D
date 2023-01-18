"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioSystem2D = exports.AudioNode2D = void 0;
const uid_1 = require("../functions/uid");
class AudioNode2D {
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
    constructor(audioSystem, audioSource, x, y, range) {
        this.audioSystem = audioSystem;
        this.audioSource = audioSource;
        this.x = x;
        this.y = y;
        this.range = range;
        this.id = (0, uid_1.UniqueID)(18).id;
        this.timestamp = Date.now();
        this.events = {};
        this.enable2DFilterManpulation = true;
        const ctx = audioSystem.ctx;
        this.track = ctx.createMediaElementSource(audioSource);
        this.gainNode = ctx.createGain();
        this.stereoPanner = ctx.createStereoPanner();
        this.lowPassFilter = ctx.createBiquadFilter();
        this.analyser = ctx.createAnalyser();
        this.analyser.fftSize = 2048;
        this.analyserBufferLength = this.analyser.frequencyBinCount;
        this.analyserDataArray = new Uint8Array(this.analyserBufferLength);
        this.lowPassFilter.frequency.value = 22050;
        this.track.connect(this.lowPassFilter).connect(this.stereoPanner).connect(this.gainNode).connect(this.analyser).connect(this.audioSystem.gain);
        audioSystem.nodes.push(this);
        this._SetEventListeners();
    }
    get mainVolume() {
        return this.audioSource.volume;
    }
    get currentTime() {
        return this.audioSource.currentTime;
    }
    get currentSource() {
        return this.audioSource.currentSrc;
    }
    get duration() {
        return this.audioSource.duration;
    }
    get playbackRate() {
        return this.audioSource.playbackRate;
    }
    get loop() {
        return this.audioSource.loop;
    }
    get autoplay() {
        return this.audioSource.autoplay;
    }
    get panValue() {
        return this.stereoPanner.pan.value;
    }
    get panAutomationRate() {
        return this.stereoPanner.pan.automationRate;
    }
    get panMinValue() {
        return this.stereoPanner.pan.minValue;
    }
    get panMaxValue() {
        return this.stereoPanner.pan.maxValue;
    }
    get gainValue() {
        return this.gainNode.gain.value;
    }
    get gainAutomationRate() {
        return this.gainNode.gain.automationRate;
    }
    get gainMinValue() {
        return this.gainNode.gain.minValue;
    }
    get gainMaxValue() {
        return this.gainNode.gain.maxValue;
    }
    get filterFrequencyValue() {
        return this.lowPassFilter.frequency.value;
    }
    get filterFrequencyAutomationRate() {
        return this.lowPassFilter.frequency.automationRate;
    }
    get filterFrequencyMinValue() {
        return this.lowPassFilter.frequency.minValue;
    }
    get filterFrequencyMaxValue() {
        return this.lowPassFilter.frequency.maxValue;
    }
    get filterGainValue() {
        return this.lowPassFilter.gain.value;
    }
    get filterGainAutomationRate() {
        return this.lowPassFilter.gain.automationRate;
    }
    get filterGainMinValue() {
        return this.lowPassFilter.gain.minValue;
    }
    get filterGainMaxValue() {
        return this.lowPassFilter.gain.maxValue;
    }
    set mainVolume(value) {
        this.audioSource.volume = value;
    }
    set currentTime(value) {
        this.audioSource.currentTime = value;
    }
    set currentSource(value) {
        this.audioSource.src = value;
    }
    set playbackRate(value) {
        this.audioSource.playbackRate = value;
    }
    set loop(value) {
        this.audioSource.loop = value;
    }
    set autoplay(value) {
        this.audioSource.autoplay = value;
    }
    set panValue(value) {
        this.stereoPanner.pan.setValueAtTime(value, this.audioSystem.ctx.currentTime);
    }
    set panAutomationRate(value) {
        this.stereoPanner.pan.automationRate = value;
    }
    set gainValue(value) {
        this.gainNode.gain.setValueAtTime(value, this.audioSystem.ctx.currentTime);
    }
    set gainAutomationRate(value) {
        this.gainNode.gain.automationRate = value;
    }
    set filterFrequencyValue(value) {
        this.lowPassFilter.frequency.setValueAtTime(value, this.audioSystem.ctx.currentTime);
    }
    set filterFrequencyAutomationRate(value) {
        this.lowPassFilter.frequency.automationRate = value;
    }
    set filterGainValue(value) {
        (value >= 0 && value <= 24000) ? this.lowPassFilter.gain.setValueAtTime(value, this.audioSystem.ctx.currentTime) : 24000;
    }
    set filterGainAutomationRate(value) {
        this.lowPassFilter.gain.automationRate = value;
    }
    _SetEventListeners() {
        this.audioSource.addEventListener("ended", () => {
            if (!this.loop)
                this.Disconnect();
            if (typeof this.events["end"] === "function")
                this.events["end"]();
        });
        this.audioSource.addEventListener("loadeddata", () => {
            if (typeof this.events["load"] === "function")
                this.events["load"]();
        });
        this.audioSource.addEventListener("play", () => {
            if (typeof this.events["play"] === "function")
                this.events["play"]();
        });
        this.audioSource.addEventListener("playing", () => {
            if (typeof this.events["playing"] === "function")
                this.events["playing"]();
        });
        this.audioSource.addEventListener("pause", () => {
            if (typeof this.events["pause"] === "function")
                this.events["pause"]();
        });
        this.audioSource.addEventListener("timeupdate", () => {
            if (typeof this.events["update"] === "function")
                this.events["update"]();
        });
    }
    /**
     * Sets the position of this audio node.
     *
     * The pan value and the filter value are adjusted according to the set position.
     *
     * @param x x-axis
     * @param y y-axis
     */
    SetPosition(x, y) {
        if (typeof x === "number")
            this.x = x;
        if (typeof y === "number")
            this.y = y;
        return this;
    }
    /**
     * Sets the position of this audio node.
     *
     * The pan value and the filter value are adjusted according to the set position.
     *
     * @param pos Vector2 object
     */
    Position(pos) {
        if (pos) {
            this.x = pos.x;
            this.y = pos.y;
        }
        return {
            x: this.x,
            y: this.y
        };
    }
    /** Plays the audio node with all effects set. */
    Play(timestamp) {
        if (typeof timestamp === "number") {
            if (timestamp >= 0 && timestamp <= this.audioSource.duration) {
                this.audioSource.currentTime = timestamp;
                this.audioSource.play();
            }
            else {
                this.audioSource.currentTime = 0;
                this.audioSource.play();
            }
            return;
        }
        this.audioSource.play();
        return this;
    }
    /** Resets all gain value to the original */
    ResetGain() {
        this.gainValue = 1;
        this.mainVolume = 1;
        return this;
    }
    /**Sets the gain value to a specific number.*/
    SetGainValue(gainValue) {
        if (gainValue > 10)
            console.warn(`This shit can be really loud. Setting gain value ${gainValue} on node id ${this.id}.`);
        this.gainValue = gainValue;
        return this;
    }
    /** Sets the pan value to a specific number. Note that the value can only be within -1 and 1. */
    SetPanValue(panValue) {
        if (panValue < -1 || panValue > 1)
            throw new Error(`Cannot set pan value '${panValue}' on node '${this.id}' since the given value is either less than -1, or more than 1.`);
        this.panValue = panValue;
        return this;
    }
    /**Sets a specific value on the low-pass filter which has to be between 0 and ?*/
    SetLowPassFilterValue(value) {
        this.filterFrequencyValue = value;
        return this;
    }
    /** Changes the current play time. */
    SetCurrentTime(timeInMilliseconds) {
        this.currentTime = timeInMilliseconds;
        return this;
    }
    /** Resets all filter value to the original */
    ResetFilter() {
        this.filterGainValue = 1;
        this.filterFrequencyValue = 22050;
        return this;
    }
    /** Returns the current loop value, or sets the loop value. */
    Loop(canLoop) {
        if (canLoop)
            return this.loop = canLoop;
        return this;
    }
    /** Returns or sets the current playback rate. */
    PlaybackRate(playbackRate) {
        if (playbackRate)
            return this.playbackRate = playbackRate;
        return this;
    }
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
    SetAnalyserFFTSize(fftSize) {
        this.analyser.fftSize = fftSize;
        this.analyserBufferLength = this.analyser.frequencyBinCount;
        this.analyserDataArray = new Uint8Array(this.analyserBufferLength);
        return this;
    }
    /**
     * The 'GetAnalyserByteTimeDomainData' method copies the current waveform, or time-domain, data
     * and returns it as a Uint8Array.
     *
     * If the array has fewer elements than the AnalyserNode.fftSize, excess elements are dropped. If it has more
     * elements than needed, excess elements are ignored.
     */
    GetAnalyserByteTimeDomainData() {
        this.analyser.getByteTimeDomainData(this.analyserDataArray);
        return this.analyserDataArray;
    }
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
    GetAnalyserByteFrequencyData() {
        this.analyser.getByteFrequencyData(this.analyserDataArray);
        return this.analyserDataArray;
    }
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
    SetAnalyserMinDecibels(decibels) {
        this.analyser.minDecibels = decibels;
        return this.analyser.minDecibels;
    }
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
    SetAnalyserMaxDecibels(decibels) {
        this.analyser.maxDecibels = decibels;
        return this.analyser.maxDecibels;
    }
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
    SetAnalyserSmoothingTimeConstant(value) {
        this.analyser.smoothingTimeConstant = value;
        return this.analyser.smoothingTimeConstant;
    }
    /**
     * Tries to find a specific audio controller node which return either the node itself,
     * or null if the specified node cannot be found.
    */
    GetAudioControllerNode(controllerNode) {
        switch (controllerNode) {
            case "BiquadFilter":
                return this.lowPassFilter;
            case "StereoPanner":
                return this.stereoPanner;
            case "GainNode":
                return this.gainNode;
            case "AnalyserNode":
                return this.analyser;
        }
        return null;
    }
    /** Returns an array with all conencted audio-context nodes, including a biquad-filter node, stereo-panner node, gain node and an analyser node. */
    GetAllAudioControllerNodes() {
        return [
            this.lowPassFilter,
            this.stereoPanner,
            this.gainNode,
            this.analyser
        ];
    }
    /**
     *  Disconnects any node audio context controllers from this 2D audio node.
     *
     *  The connected audio source, which is an audio DOM element, will also be removed using the domElement.remove() method.
     *  This makes the program unable to re-use this audio node.
     */
    Disconnect() {
        this.track.disconnect();
        this.gainNode.disconnect();
        this.stereoPanner.disconnect();
        this.lowPassFilter.disconnect();
        this.analyser.disconnect();
        this.audioSource.remove();
        this.audioSystem.DestroyAudioNode2D(this);
        return true;
    }
    /**
     * Reconnects any audio context controllers order in a specific given order represented in an array with strings.
     * The array with strings can only include one controller name.
     *
     * Audio context controllers will not get connected when they are not specified in the array with controllers.
     *
     * The default audio context controllers order is as follow:
     * BiquadFilter > StereoPanner > GainNode > AnalyserNode
     */
    Reconnect(order) {
        this.track.disconnect();
        this.gainNode.disconnect();
        this.stereoPanner.disconnect();
        this.lowPassFilter.disconnect();
        this.analyser.disconnect();
        const newOrderList = [...new Set(order)];
        let firstControllerNode = null;
        for (let i = 0; i < newOrderList.length; i++) {
            const currentOrderItem = newOrderList[i];
            const nextOrderItem = newOrderList[i + 1];
            const currentNode = this.GetAudioControllerNode(currentOrderItem);
            const nextNode = this.GetAudioControllerNode(nextOrderItem);
            if (currentNode === null)
                throw new Error("Cannot reconnect audio nodes.");
            if (i === 0)
                firstControllerNode = currentNode;
            // Connects the current node to the next node, if the next node has not defined as null.
            nextNode !== null ? currentNode.connect(nextNode) : currentNode.connect(this.audioSystem.gain);
            if (firstControllerNode !== null)
                this.track.connect(firstControllerNode);
        }
        return this;
    }
    /** Stops the playing audio from where it was. */
    Pause() {
        this.audioSource.pause();
        return this;
    }
    /**
     * Sets an event listener on this audio node, which will call a function if any of the specified events gets fired.
     * Note that existing events will be replaced.
     */
    AddEventListener(event, cb) {
        this.events[event] = cb;
        return this;
    }
    /**
     * Removes existing event listeners.
     */
    RemoveEventListener(event) {
        if (typeof this.events[event] !== "function")
            return false;
        delete this.events[event];
    }
}
exports.AudioNode2D = AudioNode2D;
class AudioSystem2D {
    /**
     * Creates an empty 2 dimensional audio system, allowing audio playback based on positioning and distance
     * You can use an 'AudioNode2D' class to play audio on this system.
     */
    constructor() {
        /** Don't play with this plz. */
        this.id = (0, uid_1.UniqueID)(18).id;
        /**
         * Maximum number of audio nodes. Default value is 50.
         * An error is returned when the maximum value is exceeded.
         *
         * Does NOT accept float values.
         **/
        this.maxAudioNodes = 50;
        /** Entire audio context. */
        this.ctx = new AudioContext();
        this.gain = this.ctx.createGain();
        this.panner = this.ctx.createStereoPanner();
        this.compressor = this.ctx.createDynamicsCompressor();
        /** Array containing audio nodes. */
        this.nodes = [];
        this.gain.connect(this.panner).connect(this.compressor).connect(this.ctx.destination);
    }
    /**
     * Sets the volume of the entire audio system.
     * Note that the audio can sound very distorted if the value is set above 2.
     *
     * Does accept float values.
     * */
    get masterVolume() {
        return this.gain.gain.value;
    }
    /**
     * Sets the volume of the entire audio system.
     * Note that the audio can sound very distorted if the value is set above 2.
     *
     * Does accept float values.
     * */
    set masterVolume(volume) {
        this.gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
    /**
     * Sets the entire stereo panning value of this system. This affects all added audio nodes.
     * The value of the panning cannot be less than -1 and more than 1. The default value is 0.
     *
     * To reset the stereo panning value, use the 'ResetPanning' method.
     */
    get masterPanning() {
        return this.panner.pan.value;
    }
    /**
     * Sets the entire stereo panning value of this system. This affects all added audio nodes.
     * The value of the panning cannot be less than -1 and more than 1. The default value is 0.
     *
     * To reset the stereo panning value, use the 'ResetPanning' method.
     */
    set masterPanning(pan) {
        if (pan >= -1 && pan <= 1) {
            this.panner.pan.setValueAtTime(pan, this.ctx.currentTime);
        }
        else {
            throw new Error("Cannot set the panning value since its either less than -1, or larger than 1.");
        }
    }
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
    SetPanValue(panValue) {
        if (panValue >= -1 && panValue <= 1)
            this.masterPanning = panValue;
        return this;
    }
    /**
     * Sets the volume of the entire audio system.
     * Note that the audio can sound very distorted if the value is set above 2.
     *
     * Does accept float values.
     * */
    SetMasterVolume(value) {
        this.masterVolume = value;
        return this;
    }
    /**
     * Removes an added audio node.
     */
    DestroyAudioNode2D(audioNode) {
        const nodes = this.nodes;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.id === audioNode.id) {
                this.nodes.splice(i, 1);
                break;
            }
        }
    }
    SetCompressorAttackValue(value) {
        this.compressor.attack.setValueAtTime(value, this.ctx.currentTime);
        return this;
    }
    SetCompressorKneeValue(value) {
        this.compressor.knee.setValueAtTime(value, this.ctx.currentTime);
        return this;
    }
    SetCompressorRatioValue(value) {
        this.compressor.ratio.setValueAtTime(value, this.ctx.currentTime);
        return this;
    }
    SetCompressorReleaseValue(value) {
        this.compressor.release.setValueAtTime(value, this.ctx.currentTime);
        return this;
    }
    SetCompressorThresholdValue(value) {
        this.compressor.threshold.setValueAtTime(value, this.ctx.currentTime);
        return this;
    }
    Update() {
        if (!this.attachedRenderObject)
            return;
        const renderObject = this.attachedRenderObject;
        const nodes = this.nodes;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.enable2DFilterManpulation) {
                const distance = Math.sqrt(Math.pow((renderObject.x - node.x), 2) + Math.pow((renderObject.y - node.y), 2));
                const horizontalDistance = Math.sqrt(Math.pow(renderObject.x - node.x, 2));
                if (distance <= node.range) {
                    const volume = 1 - (1 / node.range * distance);
                    const panning = 1 / node.range * horizontalDistance;
                    const filter = node.filterFrequencyMinValue + (node.filterFrequencyMaxValue / node.range * distance);
                    node.filterFrequencyValue = (node.filterFrequencyMinValue + node.filterFrequencyMaxValue) - filter;
                    node.panValue = (node.x >= renderObject.x) ? panning : -panning;
                    node.mainVolume = volume;
                }
                else {
                    node.mainVolume = 0;
                    node.filterFrequencyValue = 22050;
                }
            }
        }
    }
    PauseAllNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            if (!node.audioSource.paused)
                node.audioSource.pause();
        }
        return this;
    }
    AttachRenderObject(renderObject) {
        this.attachedRenderObject = renderObject;
        return this;
    }
}
exports.AudioSystem2D = AudioSystem2D;
