import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


data_enero = pd.read_csv('147_enero.csv', sep=';')
data_junio = pd.read_csv('147_junio.csv', sep=';')
data_agosto = pd.read_csv('147_agosto.csv', sep=';')

# merge into one dataframe and csv
data = pd.concat([data_enero, data_junio, data_agosto])
data.to_csv('147.csv', sep=';', index=False)
