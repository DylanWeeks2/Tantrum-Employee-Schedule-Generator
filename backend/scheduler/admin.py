from django.contrib import admin
from .models import Employee, Location, EmployeeAssignment, Request, Event

# Register your models here.
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_salon')

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'primary_location', 'secondary_location', 'color')

class EmployeeAssignmentAdmin(admin.ModelAdmin):
    list_display = ('employee', 'location', 'start', 'numWeeksSince')

class RequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'employee', 'leave_date', 'return_date', 'status')

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_start', 'event_end')

admin.site.register(Location, LocationAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(EmployeeAssignment, EmployeeAssignmentAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Request, RequestAdmin)
