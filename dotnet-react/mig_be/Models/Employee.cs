namespace mig_be.Models;

/*
    Represents our Employee model.  Employees are stored 
        internally - not in a separate database.  We can probably add
        some validators here, such as a max-length for various fields;
        maybe even date-ranges for DateOfJoining so we don't get silly data.
    I don't know why, but Swagger identifies [Sex] as a string.  Although
        adding strings of 2+ characters results in an error, I'd rather the
        true type be represented.  I need to look into this.
*/
public class Employee
{
    public int Id { get; set; }

    public string EmployeeName { get; set; } = "";

    public DateTime DateOfJoining { get; set; }

    public char Sex { get; set; }
}