import pdfminer
from pdfminer.high_level import extract_text

def pdf_to_text(path):
    try:
        # Extract text from PDF file
        text = extract_text(path)
        return text
    except Exception as e:
        print("Error processing pdf file: ", str(e))
        return None

text = pdf_to_text("algos.pdf")
print(text)

def save_to_file(text, filename):
    with open(filename, 'w') as file:
        file.write(text)

save_to_file(text, 'output.txt')