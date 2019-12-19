# Rename observations and features for easier pandas method calls
#housing_data.rename(columns = {0:"zero",
#                               1:"one",
#                               2:"two",
#                               3:"three",
#                               4:"four",
#                               5:"five",
#                               6:"six",
#                               7:"seven"},
#                               inplace = True)
#housing_data.rename(index = {0: "zero",
#                             1:"one",
#                             2:"two",
#                             3:"three",
#                             4:"four"},
#                             inplace = True)

#from prettytable import PrettyTable
#imp_mean = SimpleImputer( strategy='median') #for options other than mean imputation replace 'mean' with 'median', 'most_frequent', or 'constant'
#imp_mean.fit(train)
#imputed_train_df = imp_mean.transform(train)
#x = PrettyTable(imputed_train_df.dtype.names)
#for row in imputed_train_df:
#    x.add_row(row)
#print(x[:10])