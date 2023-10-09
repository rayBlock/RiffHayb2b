

type props = {
	query: string;
	size: 'Square' | 'Landscape' | 'Portrait';
};

export default async function getLeonardoAIImages({ query, size }: props) {


	// if (!apiKey) throw new Error('Missing Stability API key.');

	let dimWidth, dimHeight;

	if (size === 'Square') {
		dimWidth = dimHeight = 1024; // Set the width and height to 200px for square size
	} else if (size === 'Portrait') {
		dimWidth = 768; // Set width to 150px for portrait size
		dimHeight = 1344; // Set height to 200px for portrait size
	} else if (size === 'Landscape') {
		dimWidth = 1344; // Set width to 300px for landscape size
		dimHeight = 768; // Set height to 200px for landscape size
	} else {
		// Handle any other size or invalid value here
		dimWidth = dimHeight = 200; // Set default width and height to 200px
	}

	// Leonardo diffusion

//	b820ea11-02bf-4652-97ae-9ac0cc00593d

// Leonardo Creative: 6bef9f1b-29cb-40c7-b9df-32b51c1f67d3
// Leonardo Select: cd2b2a15-9760-4174-a5ff-4d2925057376
// Leonardo Signature: 291be633-cb24-434f-898f-e662799936ad

	const options = {
		method: 'POST',
		headers: {
		  accept: 'application/json',
		  'content-type': 'application/json',
		  authorization: 'Bearer 2dc9c937-deb1-49ec-9c36-385fca306a8e'
		},
		body: JSON.stringify({
		  height: dimHeight,
		//   modelId: 'b820ea11-02bf-4652-97ae-9ac0cc00593d',
		  prompt: query,
		  width: dimWidth,
		  num_images: 2,

		  // phtoto real mit api key andere subs
		  photoReal: true,
		  seed: 22

		})
	  };
	  
	 const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', options)
		.then(response => response.json())

		// .then(response => response.sdGenerationJob )
		.catch(err => console.error(err));

	  console.log(response)

	  return response
	//   const optionsGenID = {
	// 	method: 'GET',
	// 	headers: {
	// 	  accept: 'application/json',
	// 	  authorization: 'Bearer 2dc9c937-deb1-49ec-9c36-385fca306a8e'
	// 	}
	//   };
	  
	//  const res = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations/12e8fe56-079a-4df1-a9cc-6e1f343f6d2b', optionsGenID)
	// 	.then(response => response.json())
	// 	.then(responded => responded)
	// 	.catch(err => console.error(err));
	//   console.log(res, "res")
	//   console.log(res.generations_by_pk.generated_images, "gens?")

	//   return res.generations_by_pk.generated_images

}

