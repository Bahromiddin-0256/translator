# from tkinter import messagebox
# from googletrans import Translator
# import clipboard


# # Functions
# def translate():
#     word = "Hello world"
#     translator = Translator()
#     translation = translator.translate(word, src='en', dest="ar")
#     print(f"Translated Word: {translation.text}")
    
# translate()
# translator = Translator()
# a =translator.translate('veritas lux mea', src='la', dest='ru')
# print(a)

# def copy():
#     clipboard.copy(text)
# messagebox.showinfo("Success", "Text Copied!")







# ## speach to text

# import speech_recognition as sr

# def speech_to_text():
#     recognizer = sr.Recognizer()

#     with sr.Microphone() as source:
#         print("Say something...")
#         recognizer.adjust_for_ambient_noise(source)  # Adjust for ambient noise
#         audio = recognizer.listen(source, timeout=5)

#     try:
#         text = recognizer.recognize_google(audio)
#         print("You said:", text)
#     except sr.UnknownValueError:
#         print("Google Web Speech API could not understand audio")
#     except sr.RequestError as e:
#         print(f"Could not request results from Google Web Speech API; {e}")

# if __name__ == "__main__":
#     speech_to_text()



# # audio to text

import speech_recognition as sr

def audio_file_to_text(audio_file_path):
    recognizer = sr.Recognizer()
    try:
        with sr.WavFile(audio_file_path) as source:
            audio = recognizer.record(source)
    except Exception as e:
        print(f"Could not open audio file {audio_file_path} because {e}")
        return None
    try:
        text = recognizer.recognize_google(audio, language="en")
        print("Transcription:", text)
        return text
    except sr.UnknownValueError:
        print("Speech Recognition could not understand audio")
        return None
    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")
        return None
import soundfile

if __name__ == "__main__":
    audio_file_path = "audio/recorded_audio_Lyqn35B.wav"  # Replace with the path to your audio file
    # audio_file_path = "audio/new.wav"  # Replace with the path to your audio file
    # audio_file_path = "audio/about_me_free_time.wav"  # Replace with the path to your audio file
    
    data, samplerate = soundfile.read(audio_file_path)
    soundfile.write(audio_file_path, data, samplerate, subtype='PCM_16')

    audio_file_to_text(audio_file_path)


# import os
# print(os.listdir('audio/'))




# ### text to speach
# import pyttsx3 
  
# # Initialize the converter 
# converter = pyttsx3.init() 
  
# # Set properties before adding 
# # Things to say 
  
# # Sets speed percent  
# # Can be more than 100 
# converter.setProperty('rate', 150) 
# # Set volume 0-1 
# converter.setProperty('volume', 0.7) 
  
# # Queue the entered text  
# # There will be a pause between 
# # each one like a pause in  
# # a sentence 
# converter.say("Hello GeeksforGeeks") 
# converter.say("I'm also a geek") 
  
# # Empties the say() queue 
# # Program will not continue 
# # until all speech is done talking 
# converter.runAndWait() 