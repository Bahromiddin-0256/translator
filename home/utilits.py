
import speech_recognition as sr
import soundfile
from googletrans import Translator

def audio_file_to_text(audio_file_path, src_='en', dest_='ru'):
    data, samplerate = soundfile.read(audio_file_path)
    soundfile.write(audio_file_path, data, samplerate, subtype='PCM_16')

    recognizer = sr.Recognizer()
    with sr.WavFile(audio_file_path) as source:
        audio = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio, language=src_)
        print("Transcription:", text)
        translator = Translator()
        
        translation = translator.translate(text=text, src=src_, dest=dest_)
        # print(f"Translated Word: {translation.text}")
  
        return translation
    except sr.UnknownValueError:
        print("Speech Recognition could not understand audio")
        return None
    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")
        return None

# if __name__ == "__main__":
#     audio_file_path = "audio/recorded_audio.wav"  # Replace with the path to your audio file
#     # audio_file_path = "audio/new.wav"  # Replace with the path to your audio file
#     # audio_file_path = "audio/about_me_free_time.wav"  # Replace with the path to your audio file
    
#     # data, samplerate = soundfile.read(audio_file_path)
#     # soundfile.write(audio_file_path, data, samplerate, subtype='PCM_16')

#     audio_file_to_text(audio_file_path)

