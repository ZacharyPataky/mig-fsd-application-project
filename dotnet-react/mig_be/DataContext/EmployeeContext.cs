using Microsoft.EntityFrameworkCore;
using mig_be.Models;

namespace mig_be.DataContext;

/*
    This class represents a session with the database. 
    DbContext abstracts the database, adding numerous free 
        features.  This includes CRUD operations used
        in EmployeesController.cs, change tracking (to 
        persist Employee objects), querying, transactions, etc.
*/
public class EmployeeContext : DbContext
{
    public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
    {

    }

    /*
        This represents the database for our Employee objects.
        The property is read-only, and cannot be set directly.
        It's used for in-memory storage; critical for our lack of a
            separate RDMS.
    */
    public DbSet<Employee> Employees { get; set; } = null!;  // Used for in-memory storage
}