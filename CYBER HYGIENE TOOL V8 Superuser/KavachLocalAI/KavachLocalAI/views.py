import csv
from django.shortcuts import render
from .model import train_model_and_save, evaluate_model, preprocess_data, train_model 

def show_data_page(request):
    data_list = []

    try:

        with open(r'C:\Users\acer\Desktop\MIET_Internship-main\CYBER HYGIENE TOOL V7 Superuser\KavachLocalAI\kavachdata.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                data_list.append({
                    'URL': row['URL'],
                    'RequestMethod': row['RequestMethod'],
                    'ETA': row['ETA'],
                })


        processed_data = preprocess_data(data_list)  
        trained_model = train_model(processed_data) 


    except Exception as e:
        print(f"Error reading CSV: {e}")
        return render(request, 'error.html', {'error_message': 'Failed to load data. Please try again later.'})


def train_model_view(request):
    data_path = r'C:\Users\acer\Desktop\MIET_Internship-main\CYBER HYGIENE TOOL V7 Superuser\KavachLocalAI\kavachdata.csv'
    model_save_path = r'C:\Users\acer\Desktop\MIET_Internship-main\CYBER HYGIENE TOOL V7 Superuser\KavachLocalAI\model.pkl'

    try:
        accuracy, report = train_model_and_save(data_path, model_save_path)

        return render(request, 'model_trained.html', {'accuracy': accuracy, 'report': report})
    
    except Exception as e:
        return render(request, 'error.html', {'error_message': 'Failed to train the model. Please try again later.'})
