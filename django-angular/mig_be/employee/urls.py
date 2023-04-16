from django.urls import path
from . import views

'''
    I initially only had the following two paths:
        employees/
        employees/<int:id>/
    Naturally, they were distinguished by their methods. I broke them apart for two reasons.
        First, I was having trouble down-the-line distinguishing them via Postman.  I don't know why,
            but everything ran as a GET request, even if the given methods were POST, PUT, or DELETE.  I 
            discovered that slightly modifying each URL with another term fixed this.  I'm not the biggest
            fan of the design, and I intend on looking back at this later.
        Second, I felt like having multiple methods crammed into one path made the code slightly less readable.
            Do I know what the code means?  Sure!  However, will a casual audience understand it at first-glance?
            I don't know about that.  Therefore, I broke it up to make the code more generally readable.
    '''
# All final APIs prepended with ".../api/"
urlpatterns = [
    # http://localhost:8000/api/employees/
    path('employees/', views.get_all_employees),

    # http://localhost:8000/api/employees/<id>/
    path('employees/<int:id>/', views.get_employee),

    # http://localhost:8000/api/employees/create + body
    path('employees/create/', views.create_employee),

    # http://localhost:8000/api/employees/update/<id>/ + body
    path('employees/update/<int:id>/', views.update_employee),

    # http://localhost:8000/api/employees/delete/<id>/
    path('employees/delete/<int:id>/', views.delete_employee),
]
