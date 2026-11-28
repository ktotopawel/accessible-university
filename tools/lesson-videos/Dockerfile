# Toolbox for generating the slide-show lesson videos (see README.md next to this file).
FROM python:3.12-slim
RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg fonts-inter \
 && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir pillow piper-tts
# Polish neural voice (rhasspy/piper-voices on Hugging Face)
RUN python -m piper.download_voices --data-dir /voices pl_PL-gosia-medium
WORKDIR /work
