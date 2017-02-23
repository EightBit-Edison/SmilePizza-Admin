from django.shortcuts import render

# Create your views here.
from django.views.generic.edit import FormView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import auth
from django.http import HttpResponseRedirect
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required

def logoutfunc(request):
    logout(request)
    # Redirect to a success page.
    return HttpResponseRedirect("/tracking/")

@login_required(login_url="/tracking/")
def add_view(request):
    context = {"in", "lu"}
    return render(request, 'Add.html', context)

@login_required(login_url="/tracking/")
def panel(request):
    context = {"in", "li"}
    return render(request, 'admin.html', context)

class LoginFormView(FormView):
    form_class = AuthenticationForm

    # Аналогично регистрации, только используем шаблон аутентификации.
    template_name = "auth.html"

    # В случае успеха перенаправим на .
    success_url = "/panel"

    def form_valid(self, form):
        # Получаем объект пользователя на основе введённых в форму данных.
        self.username = self.request.POST['username']
        self.password = self.request.POST['password']
        self.user = auth.authenticate(username=self.username, password=self.password)

        # Выполняем аутентификацию пользователя.
        auth.login(self.request, self.user)
        return super(LoginFormView, self).form_valid(form)
