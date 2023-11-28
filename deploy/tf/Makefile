default: help

RED:=$(shell tput setaf 1)
YLW:=$(shell tput setaf 3)
GRN:=$(shell tput setaf 2)
NOP:=$(shell tput sgr0)


help:
	@echo "Popular Make Targets:"
	@echo " Testing:"
	@echo "   ${GRN}output${NOP}                   - show terraform result output (ReadOnly)"
	@echo "   ${GRN}plan${NOP}                     - show terraform plan output (ReadOnly)"
	@echo "   ${GRN}planout${NOP}                  - show terraform plan output and save plan to terraform.plan (ReadOnly)"
	@echo " ${YLW}Here Be Dragons:${NOP}"
	@echo "   ${RED}apply${YLW}                    - perform changes based on terraform.plan input${NOP}"
	@echo "   ${RED}refresh${YLW}                  - refresh TF state without making changes${NOP}"
	@echo ""
	@echo "The TARGET variable can be used for more detailed updates"
	@echo "  - ${GRN}TARGET=module.xxx,module.yyy make planout${NOP}"

ifdef TARGET
space := $(subst ,, )
comma:= ,
TARGET_LIST := $(subst $(comma),$(space),$(TARGET))
TARGET := $(addprefix -target , $(TARGET_LIST))
endif

# setup stuff
.terraform/.gitignore: ${SECRET_FILE}
	terraform init && echo '.' > .terraform/.gitignore

tfinit: ${SECRET_FILE} .terraform/.gitignore



# basic commands

# print the command that planout will run
showplanout:
	@echo "terraform get && terraform plan -detailed-exitcode -out terraform.plan ${TARGET}"

show: sourceenv
	terraform get && terraform show

plan: tfinit
	terraform get && terraform plan -refresh=false ${TARGET}

planout: tfinit
	terraform get && terraform plan -detailed-exitcode -out terraform.plan ${TARGET}

# print the command that apply will run
showapply:
	@echo "terraform apply -parallelism=1 terraform.plan && mv terraform.plan terraform.plan.APPLIED.$(shell date +%Y%m%d.%H%M%S)"

apply: tfinit
	terraform apply -parallelism=1 terraform.plan && mv terraform.plan terraform.plan.APPLIED.$(shell date +%Y%m%d.%H%M%S)

refresh: tfinit
	terraform apply -refresh-only

upgrade: tfinit
	terraform init -upgrade


# stuff beyond basic commands
fastapply: tfinit
	terraform apply -parallelism=8 terraform.plan && mv terraform.plan terraform.plan.APPLIED.$(shell date +%Y%m%d.%H%M%S)

# info functions
output: tfinit
	@terraform output
