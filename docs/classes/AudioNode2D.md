# AudioNode2D

Creates an audio node in which to configure audio.
This audio node is played dynamically based on the settings and the attached audio system.

An error might be thrown when the maximum number of audio nodes in the given audio system exceeds.

- - - 

## Constructor

```ts
new AudioNode2D(audioSystem: AudioSystem2D, audioSource: HTMLAudioElement, x: number, y: number, range: number);
```

| Argument name   | Type             | Required | Description                                              |
|-----------------|------------------|----------|----------------------------------------------------------|
| ``audioSystem`` | AudioSystem2D    | Yes      | The audio system in which the audio node will be played. |
| ``audioSource`` | HTMLAudioElement | Yes      | The audio source that will be used to play audio.        |
| ``x``           | Number           | Yes      | X axis of the 2D audio node.                             |
| ``y``           | Number           | Yes      | Y-axis of the 2D audio node.                             |
| ``range``       | Number           | Yes      | Range of the playing 2D audio node.                      |

## Class properties

| Property name                     | Type             | Description                                                                         | Access type                      |
|-----------------------------------|------------------|-------------------------------------------------------------------------------------|----------------------------------|
| ``id``                            | String           | An unique generated ID for each instance.                                           | ``Changable (Prevent doing it)`` |
| ``timestamp``                     | Number           | Timestamp in Unix format in which the instance has been created.                    | ``Changable (Prevent doing it)`` |
| ``convolver``                     | ConvolverNode    | AudioContext child node.                                                            | ``Changable (Prevent doing it)`` |
| ``gainNode``                      | GainNode         | AudioContext child node.                                                            | ``Changable (Prevent doing it)`` |
| ``stereoPanner``                  | StereoPannerNode | AudioContext child node.                                                            | ``Changable (Prevent doing it)`` |
| ``lowPassFilter``                 | BiquadFilterNode | AudioContext child node.                                                            | ``Changable (Prevent doing it)`` |
| ``analyser``                      | AnalyserNode     | AudioContext child node.                                                            | ``Changable (Prevent doing it)`` |
| ``analyserBufferLength``          | Number           | Buffer length in which will be used by the analyser.                                | ``Changable (Prevent doing it)`` |
| ``analyserDataArray``             | Uint8Array       | Uint8Array containing data about the audio.                                         | ``Changable``                    |
| ``events``                        | Object<Function> | Object with functions.                                                              | ``Readonly``                     |
| ``mainVolume``                    | Number           | Volume of the HTMLAudioElement node, not the gain node.                             | ``Changable``                    |
| ``currentTime``                   | Number           | Current time of the audio node.                                                     | ``Changable``                    |
| ``currentSource``                 | String           | Current source of the playing audio node.                                           | ``ReadOnly``                     |
| ``duration``                      | Number           | Duration of the HTMLAudioElement node.                                              | ``Readonly``                     |
| ``playbackRate``                  | Number           | Playback rate of the HTMLAudioElement node.                                         | ``Changable``                    |
| ``panValue``                      | Number           | Value of the stereo panner which has to be between ``-1`` and ``1``                 | ``Changable``                    |
| ``panAutomationRate``             | Number           | Unknown.                                                                            | ``Changable``                    |
| ``panMinValue``                   | Number           | Unknown.                                                                            | ``Readonly``                     |
| ``panMaxValue``                   | Number           | Unknown                                                                             | ``Readonly``                     |
| ``gainValue``                     | Number           | Value of the gain node which has can sound very loud when it exceeds the number 10. | ``Changable``                    |
| ``gainAutomationRate``            | Number           | Unknown                                                                             | ``Readonly``                     |
| ``gainMinValue``                  | Number           | Unknown                                                                             | ``Readonly``                     |
| ``gainMaxValue``                  | Number           | Unknown                                                                             | ``Readonly``                     |
| ``filterFrequencyValue``          | Number           | Frequency value of the lowpass-filter that has to be within 0 and 20500.            | ``Changable``                    |
| ``filterFrequencyAutomationRate`` | Number           | Unknown                                                                             | ``Readonly``                     |
| ``filterFrequencyMinValue``       | Number           | Unknown                                                                             | ``Readonly``                     |
| ``filterFrequencyMaxValue``       | Number           | Unknown                                                                             | ``Readonly``                     |
| ``filterGainValue``               | Number           | Gain volume of the lowpass-filter itself.                                           | ``Changable``                    |
| ``filterGainAutomationRate``      | Number           | Unknown                                                                             | ``Readonly``                     |
| ``filterGainMinValue``            | Number           | Unknown                                                                             | ``Readonly``                     |
| ``filterGainMaxValue``            | Number           | Unknown                                                                             | ``Readonly``                     |

## Methods

### ``SetPosition()``

Sets the position of this audio node.

The pan value and the filter value are adjusted according to the set position.

```ts
public SetPosition(x: number | null, y: number | null): AudioNode2D;
```

### ``Position()``

Sets the position of this audio node.

The pan value and the filter value are adjusted according to the set position.

```ts
public Position(pos?: Vec2 | Vector2): Vector2;
```

### ``Play()``

Plays the audio node with all effects set.

```ts
public Play(timestamp?: number);
```

### ``ResetGain()``

Resets all gain value to the original

```ts
public ResetGain(): AudioNode2D;
```

### ``SetGainValue()``

Sets the gain value to a specific number.

```ts
public SetGainValue(gainValue: number): AudioNode2D;
```

### ``SetPanValue()``

Sets the pan value to a specific number. Note that the value can only be within -1 and 1. 

```ts
public SetPanValue(panValue: number): AudioNode2D;
```

### ``SetLowPassFilterValue()``

Sets a specific value on the low-pass filter which has to be between 0 and ?

```ts
public SetLowPassFilterValue(value: number): AudioNode2D;
```

### ``SetCurrentTime()``

Changes the current play time.

```ts
public SetCurrentTime(timeInMilliseconds: number): AudioNode2D;
```

### ``ResetFilter()``

Resets all filter values to the original.

```ts
public ResetFilter(): AudioNode2D;
```

### ``Loop()``

Returns the current loop value, or sets the loop value.

```ts
public Loop(canLoop?: boolean): boolean | AudioNode2D;
```

### ``PlaybackRate()``

Returns or sets the current playback rate.

```ts
public PlaybackRate(playbackRate?: number): number | AudioNode2D
```

### ``SetAnalyserFFTSize()``

Sets the amount of window size samples when performing a FFT (Fast Fourier Transform)
to get frequency domain data.
	  
This method also sets the analyser buffer length, and data array.
	  
Must be a power of 2 between 2^5^ and 2^15^, so one of: 
32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768. Defaults to 2048.
	  
Thrown if the value set is not a power of 2, or is outside the allowed range.

```ts
public SetAnalyserFFTSize(fftSize: AudioNode2DAnalyserFFTSize): AudioNode2D;
```

### ``GetAnalyserByteTimeDomainData()``

The 'GetAnalyserByteTimeDomainData' method copies the current waveform, or time-domain, data 
and returns it as a Uint8Array.
	  
If the array has fewer elements than the AnalyserNode.fftSize, excess elements are dropped. If it has more
elements than needed, excess elements are ignored.

```ts
public GetAnalyserByteTimeDomainData(): Uint8Array;
```

### ``GetAnalyserByteFrequencyData()``

The 'GetAnalyserByteFrequencyData' method copies current frequency data and returns it as a Uint8Array.
	
The frequency data is composed of integers on a scale from 0 to 255.
Each item in the array represents the decibel value for a specific frequency. The frequencies are spread linearly 
from 0 to 1/2 of the sample rate. For example, for 48000 sample rate, the last item of the array will represent the decibel value for 24000 Hz.
	  
If the array has fewer elements than the AnalyserNode.frequencyBinCount, excess elements are dropped. 
If it has more elements than needed, excess elements are ignored.

```ts
public GetAnalyserByteFrequencyData(): Uint8Array;
```

### ``SetAnalyserMinDecibels()``

The minDecibels property of the AnalyserNode interface is a double value representing the minimum 
power value in the scaling range for the FFT analysis data, for conversion to unsigned byte 
values — basically, this specifies the minimum value for the range of 
results when using GetAnalyserByteFrequencyData(). 
	
A double, representing the minimum decibel value for scaling the FFT analysis data, 
where 0 dB is the loudest possible sound, -10 dB is a 10th of that, etc. The default value is -100 dB.
	  
When getting data from GetAnalyserByteFrequencyData(), any frequencies with an amplitude of minDecibels or 
lower will be returned as 0.

```ts
public SetAnalyserMinDecibels(decibels: number): number;
```

### ``SetAnalyserMaxDecibels()``

The maxDecibels property of the AnalyserNode interface is a double value representing the maximum power value 
in the scaling range for the FFT analysis data, for conversion to unsigned byte values — basically, this specifies 
the maximum value for the range of results when using GetAnalyserByteFrequencyData().
	  
A double, representing the maximum decibel value for scaling the FFT analysis data, where 0 dB is the loudest possible
sound, -10 dB is a 10th of that, etc. The default value is -30 dB.
	  
When getting data from GetAnalyserByteFrequencyData(), any frequencies with an amplitude of maxDecibels or higher will
be returned as 255.

```ts
public SetAnalyserMaxDecibels(decibels: number): number;
```

### ``SetAnalyserSmoothingTimeConstant()``

The smoothingTimeConstant property of the AnalyserNode interface is a double value representing the averaging constant 
with the last analysis frame. It's basically an average between the current buffer and the last buffer the AnalyserNode
processed, and results in a much smoother set of value changes over time. 
	  
A double within the range 0 to 1 (0 meaning no time averaging). The default value is 0.8.
	  
If 0 is set, there is no averaging done, whereas a value of 1 means "overlap the previous and current buffer quite a lot
while computing the value", which essentially smooths the changes across GetAnalyserByteFrequencyData calls.
	
In technical terms, we apply a Blackman window and smooth the values over time. The default value is good enough for most cases.

```ts
public SetAnalyserSmoothingTimeConstant(value: number): number;
```

### ``GetAudioControllerNode()``

Tries to find a specific audio controller node which return either the node itself, 
or null if the specified node cannot be found.

```ts
public GetAudioControllerNode(controllerNode: AudioNode2DControllerNodeName): AudioNode2DControllerNodes | null;
```

### ``GetAllAudioControllerNodes()``

Returns an array with all conencted audio-context nodes, including a biquad-filter 
node, stereo-panner node, gain node and an analyser node.

```ts
public GetAllAudioControllerNodes(): AudioNode2DControllerNodes[];
```

### ``Disconnect()``

Disconnects any node audio context controllers from this 2D audio node.
	  
The connected audio source, which is an audio DOM element, will also be removed using the domElement.remove() method.
This makes the program unable to re-use this audio node.

```ts
public Disconnect(): boolean;
```

### ``Reconnect()``

Reconnects any audio context controllers order in a specific given order represented in an array with strings.
The array with strings can only include one controller name.
	  
Audio context controllers will not get connected when they are not specified in the array with controllers.
	  
The default audio context controllers order is as follow:
BiquadFilter > StereoPanner > GainNode > AnalyserNode

```ts
public Reconnect(order: AudioNode2DControllerNodeName[]): AudioNode2D;
```

### ``Pause()``

Stops the playing audio from where it was.

```ts
public Pause(): void;
```

### ``AddEventListener()``

Sets an event listener on this audio node, which will call a function if any of the specified events gets fired.
Note that existing events will be replaced.

```ts
public AddEventListener(event: AudioNode2DEvents, cb: () => void);
```

### ``RemoveEventListener()``

Removes existing event listeners.

```ts
public RemoveEventListener(event: AudioNode2DEvents);
```
