import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import BernoulliNB, MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.metrics import f1_score


def preprocess_data(file_path):
    try:
        data = pd.read_csv(file_path)
        processed_data = data[['URL', 'RequestMethod', 'ETA', 'Malicious']]
        return processed_data
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
        return None
    except Exception as e:
        print(f"Error occurred while preprocessing data: {e}")
        return None


def train_model(processed_data):
    expected_columns = ['URL', 'RequestMethod', 'ETA', 'Malicious']  
    missing_columns = [col for col in expected_columns if col not in processed_data.columns]

    if missing_columns:
        raise ValueError(f"Columns {missing_columns} are missing in processed_data.")

    X = processed_data[['URL', 'RequestMethod', 'ETA']]  
    y = processed_data['Malicious']  

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, X_test, y_train, y_test

def evaluate_model(model, X_test, y_test):
 
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    return accuracy, report


def train_model_and_save():
    data_path = r'C:\Users\acer\Desktop\MIET_Internship-main\CYBER HYGIENE TOOL V7 Superuser\KavachLocalAI\kavachdata.csv'

    save_path = 'C:/Users/acer/Desktop/MIET_Internship-main/CYBER HYGIENE TOOL V7 Superuser/KavachLocalAI/model.pkl'

    data = pd.read_csv(data_path)
    features = ['URL', 'RequestMethod', 'ETA']
    X = data[features]  # Features
    y = data['Malicious']  # Target variable
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier()

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)

    joblib.dump(model, save_path)

    # Return model evaluation metrics
    return accuracy, report

    
