from django.db import models


class Employee(models.Model):
    """
    Summary:
        Represents the [employee_employee] table from [mig_django_db] database.
        The primary key is [id], none of the fields can be null.
    """

    id = models.IntegerField(primary_key=True)
    employee_name = models.CharField(max_length=50)
    date_of_joining = models.DateField()
    sex = models.CharField(max_length=1)

    def __str__(self):
        return self.name
