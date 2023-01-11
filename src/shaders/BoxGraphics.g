import System.Utilities;
import System.IO;
import System.Graphics.Core;
import System.Graphics.WGSL;

namespace Cube extends ShaderProgram -> Entry {

	global var sampler: Sampler;
	global var texture: Texture2D<float32>;

	interface VertexShaderOutput {
		position?: Vector4<float32>;
		fragUV?: Vector2<float32>;
	}

	@STAGE(VertexShader): ShaderDefinitionFunction -> 
	function Vertex(vertexIndex: int): VertexShaderOutput {
		
		const positions: Vector2<int>[] = [
			new Vector2(1, 1)
			new Vector2(1, -1)
			new Vector2(-1, -1)
			new Vector2(1, 1)
			new Vector2(-1, -1)
			new Vector2(-1, 1)
		];
		
		const uvs: Vector2<int>[] = [
			new Vector2(1.0, 0.0),
			new Vector2(1.0, 1.0),
			new Vector2(0.0, 1.0),
			new Vector2(1.0, 0.0),
			new Vector2(0.0, 1.0),
			new Vector2(0.0, 0.0),
		];
		
		const colorFaces: string = [
			"0xff0000",
			"0xff0000",
			"0xff0000",
			"0xff0000",
			"0xff0000",
			"0xff0000",
		];
		
		const output: VertexShaderOutput = new Object();
		
		output.position = new Vector4(positions[vertexIndex], 0, 1);
		output.fragUV = uvs[vertexIndex];
		
		return output;
	}
	
	@STAGE(FragmentShader): ShaderDefinitionFunction -> 
	function Fragment(fragUV: Vector2<float32>): Vector4<float32> {
	
		return TextureSample(texture, sampler, fragUV);
	}

	function Entry(): ShaderDefinitionFunction[] {
		return [Vertex, Fragment];
	}
}