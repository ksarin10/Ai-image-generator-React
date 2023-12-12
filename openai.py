from openai import Image



import openai

# Set your OpenAI API key
openai.api_key = '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'

# Use the OpenAI library to generate an image
response = openai.Image.create(
    prompt="spider man on the empire state at night scarlet spider suit",
    size="1024x1024",
    quality="standard",
    n=1,
)

# Get the image URL from the response
image_url = response.data[0].url
print(image_url)