default: help

RED:=$(shell tput setaf 1)
YLW:=$(shell tput setaf 3)
GRN:=$(shell tput setaf 2)
NOP:=$(shell tput sgr0)

# If AWS_PROFILE is not set fail
ifndef AWS_PROFILE
$(error AWS_PROFILE is not set. Please set it to the appropriate AWS CLI profile before running make commands. For example: export AWS_PROFILE=gdcode-identity-bootstrap)
endif

help:
	@echo "Popular Make Targets:"
	@echo " Testing:"
	@echo "   ${GRN}plan${NOP}                     - show terraform plan output"
	@echo "   ${GRN}planout${NOP}                  - show terraform plan output and save plan to terraform.plan"
	@echo " ${YLW}Here Be Dragons:${NOP}"
	@echo "   ${RED}apply${YLW}                    - perform changes based on terraform.plan input${NOP}"
	@echo "   ${RED}refresh${YLW}                  - refresh TF state without making changes${NOP}"
	@echo ""
	@echo "The TARGET variable can be used for more detailed updates"
	@echo "  - Example: ${GRN}TARGET=module.something make planout${NOP}"


ifdef TARGET
space := $(subst ,, )
comma:= ,
TARGET_LIST := $(subst $(comma),$(space),$(TARGET))
TARGET := $(addprefix -target , $(TARGET_LIST))
endif

# setup stuff
.terraform/.gitignore:
	AWS_PROFILE=$(AWS_PROFILE) terraform init && echo '.' > .terraform/.gitignore

tfinit: .terraform/.gitignore

# basic commands
show: tfinit
	AWS_PROFILE=$(AWS_PROFILE) terraform show

plan: tfinit
	AWS_PROFILE=$(AWS_PROFILE) terraform plan ${TARGET}

planout: tfinit
	AWS_PROFILE=$(AWS_PROFILE) terraform plan -detailed-exitcode -out terraform.plan ${TARGET}

apply: tfinit
	AWS_PROFILE=$(AWS_PROFILE) terraform apply terraform.plan && mv terraform.plan terraform.plan.APPLIED.$(shell date +%Y%m%d.%H%M%S)

refresh: tfinit
	AWS_PROFILE=$(AWS_PROFILE) terraform apply -refresh-only

upgrade: tfinit
	AWS_PROFILE=$(AWS_PROFILE) terraform init -upgrade

output: tfinit
	@AWS_PROFILE=$(AWS_PROFILE) terraform output

clean:
	find ../ -type f -name 'terraform.plan' -exec rm -f {} +
	find ../ -type f -name 'terraform.plan.APPLIED.*' -exec rm -f {} +