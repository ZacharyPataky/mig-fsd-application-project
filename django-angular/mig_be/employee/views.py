from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from .models import Employee
import json

'''
Similar to what we discuseed in urls.py, I initially had all of these functions crammed
into only two methods.  I then used if/else blocks to follow the correct path for each method.
Did it work?  Yes!  It even removed some redundancies, such as the repeated try/except error-handling
blocks.  However, I opted for this route to break the code up and make it more readable.  I also found
more documentation/examples online of people writing their APIs like this.
'''


@api_view(['GET'])
def get_all_employees(request):
    """
    Summary:
        Gets all employees

    Args:
        request: An HTTP request object containing information about the request

    Returns:
        A JSON object containing the data of all employees

    API URL:
        GET - http://localhost:8000/api/employees
    """

    employees = Employee.objects.all().values()
    return JsonResponse({'employees': list(employees)})


@api_view(['POST'])
def create_employee(request):
    """
    Summary:
        Creates a new employee from a given body.

    Args:
        request: An HTTP request object containing information about the request; most notably the body

    Returns:
        A JSON object containing the new employee's data

    API URL:
        POST - http://localhost:8000/api/employees/
    """

    data = json.loads(request.body)
    employee = Employee.objects.create(
        employee_name=data['employee_name'],
        date_of_joining=data['date_of_joining'],
        sex=data['sex']
    )
    return JsonResponse({'employee': model_to_dict(employee)}, status=201)


@api_view(['GET'])
def get_employee(request, id):
    """
    Summary:
        Gets an employee by a given ID

    Args:
        request: An HTTP request object containing information about the request
        id: The target employee's ID represented as an integer

    Returns:
        A JSON object containing the retrieved employee's data, or a 404 error if the employee is not found

    API URL:
        GET - http://localhost:8000/api/employees/<id>/
    """

    try:
        employee = Employee.objects.get(id=id)
    except:
        return JsonResponse({'error': 'Employee not found'}, status=404)

    return JsonResponse({'employee': model_to_dict(employee)})


@api_view(['PUT'])
def update_employee(request, id):
    """
    Summary:
        Updates an employee with a given body via the employee's [id].

    Args:
        request: An HTTP request object containing information about the request; most notably the body
        id: The target employee's ID represented as an integer

    Returns:
        A JSON object containing the updated employee's data, or a 404 error if the employee is not found

    API URL:
        PUT - http://localhost:8000/api/employees/<id>/
    """

    try:
        employee = Employee.objects.get(id=id)
    except:
        return JsonResponse({'error': 'Employee not found'}, status=404)

    data = json.loads(request.body)
    employee.employee_name = data['employee_name']
    employee.date_of_joining = data['date_of_joining']
    employee.sex = data['sex']
    employee.save()
    return JsonResponse({'employee': model_to_dict(employee)})


@api_view(['DELETE'])
def delete_employee(request, id):
    """
    Summary:
       Deletes an employee via the employee's [id].

    Args:
        request: An HTTP request object containing information about the request
        id: The target employee's ID represented as an integer

    Returns:
        A status of 204 for no content, or a 404 error if the employee is not found

    API URL:
        DELETE - http://localhost:8000/api/employees/<id>/
    """

    try:
        employee = Employee.objects.get(id=id)
    except:
        return JsonResponse({'error': 'Employee not found'}, status=404)

    employee.delete()
    return HttpResponse(status=204)
